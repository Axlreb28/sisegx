<?php
// backend/api/login.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar solicitudes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

class Login {
    private $conn;
    private $table_name = 'Usuario';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($usuario, $password) {
        // Consulta principal para obtener información del usuario
        $query = "SELECT u.Id, u.Usuario, u.Nombre, u.ApellidoP, u.ApellidoM, u.Puesto, 
                         u.Estatus, u.IdDivisionAdm, u.IdUnidad, u.IdRolSistema, u.Password,
                         r.Nombre as RolNombre, r.Descripcion as RolDescripcion,
                         d.Nombre as DivisionNombre, d.Pais, d.Region, d.Ciudad 
                  FROM " . $this->table_name . " u
                  LEFT JOIN RolSistema r ON u.IdRolSistema = r.Id
                  LEFT JOIN DivisionAdministrativa d ON u.IdDivisionAdm = d.Id
                  WHERE u.Usuario = :usuario";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // Verificar contraseña - Si están almacenadas con hash
            if (password_verify($password, $user['Password']) || $password === $user['Password']) {
                // Verificar estatus
                if ($user['Estatus'] !== 'ACTIVO') {
                    return ['success' => false, 'message' => 'Usuario inactivo'];
                }
                
                // Obtener las unidades asignadas al usuario
                $unidades = $this->getUserUnidades($user['Id']);
                
                // Obtener los permisos según el rol del usuario
                $permisos = $this->getRolPermisos($user['IdRolSistema']);
                
                // Eliminar password de la respuesta
                unset($user['Password']);
                
                // Crear objeto de respuesta con toda la información necesaria
                $userData = [
                    'usuario' => $user,
                    'rol' => [
                        'id' => $user['IdRolSistema'],
                        'nombre' => $user['RolNombre'],
                        'descripcion' => $user['RolDescripcion']
                    ],
                    'division' => [
                        'id' => $user['IdDivisionAdm'],
                        'nombre' => $user['DivisionNombre'],
                        'pais' => $user['Pais'],
                        'region' => $user['Region'],
                        'ciudad' => $user['Ciudad']
                    ],
                    'unidades' => $unidades,
                    'permisos' => $permisos
                ];
                
                return [
                    'success' => true, 
                    'user' => $userData
                ];
            }
        }
        
        return ['success' => false, 'message' => 'Credenciales inválidas'];
    }
    
    // Obtener las unidades asignadas al usuario
    private function getUserUnidades($userId) {
        $query = "SELECT u.id as unidad_id, u.clave, u.nombre_unidad, u.estatus, 
                         u.nivel, u.tipo_cuenta, u.periodo, u.abreviatura, u.siglas
                  FROM usuario_unidad uu
                  JOIN unidades u ON uu.unidad_id = u.id
                  WHERE uu.usuario_id = :userId";
                  
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    // Obtener los permisos según el rol
    // Nota: Esto es un ejemplo. Necesitarías crear una tabla de permisos y relacionarla con roles
    private function getRolPermisos($rolId) {
        // Esta es una implementación de ejemplo
        // Idealmente deberías tener una tabla de permisos y una relación muchos a muchos con roles
        
        // Permisos por defecto para todos
        $permisos = ['ver_dashboard'];
        
        // Asignar permisos según el rol
        switch ($rolId) {
            case 1: // Administrador
                $permisos = array_merge($permisos, [
                    'admin_usuarios', 'admin_roles', 'admin_unidades', 'admin_divisiones',
                    'crear_tramite', 'editar_tramite', 'eliminar_tramite', 
                    'ver_reportes', 'exportar_reportes', 'configuracion_sistema'
                ]);
                break;
            case 2: // Gestor
                $permisos = array_merge($permisos, [
                    'crear_tramite', 'editar_tramite', 'ver_reportes'
                ]);
                break;
            case 3: // Usuario regular
                $permisos = array_merge($permisos, [
                    'crear_tramite', 'ver_mis_tramites'
                ]);
                break;
            // Añadir más casos según tus roles
        }
        
        return $permisos;
    }
}

// Manejar la solicitud
try {
    // Obtener datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"));
    
    // Validar datos recibidos
    if (!isset($data->usuario) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Faltan datos de usuario o contraseña'
        ]);
        exit;
    }
    
    // Crear conexión
    $database = new Database();
    $db = $database->getConnection();
    
    // Inicializar objeto de login
    $login = new Login($db);
    
    // Intentar iniciar sesión
    $result = $login->login($data->usuario, $data->password);
    
    if ($result['success']) {
        // Iniciar sesión PHP
        session_start();
        $_SESSION['user_id'] = $result['user']['usuario']['Id'];
        $_SESSION['usuario'] = $result['user']['usuario']['Usuario'];
        $_SESSION['nombre'] = $result['user']['usuario']['Nombre'];
        $_SESSION['rol_id'] = $result['user']['rol']['id'];
        $_SESSION['rol_nombre'] = $result['user']['rol']['nombre'];
        $_SESSION['timestamp'] = time();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'user' => $result['user']
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => $result['message']
        ]);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error del servidor: ' . $e->getMessage()
    ]);
}