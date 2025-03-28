<?php
// backend/api/login.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

class Login {
    private $conn;
    private $table_name = 'usuarios';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($usuario, $password) {
        $query = "SELECT id, usuario, nombre_completo, password, estatus, unidad 
                  FROM " . $this->table_name . " 
                  WHERE usuario = :usuario";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            // Verificar estatus
            if ($user['estatus'] !== 'ACTIVO') {
                return ['success' => false, 'message' => 'Usuario inactivo'];
            }
            
            // Eliminar password de la respuesta
            unset($user['password']);
            
            return [
                'success' => true, 
                'user' => $user
            ];
        }
        
        return ['success' => false, 'message' => 'Credenciales inválidas'];
    }
}

// Manejar la solicitud
try {
    // Obtener datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"));
    
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
        $_SESSION['user_id'] = $result['user']['id'];
        $_SESSION['usuario'] = $result['user']['usuario'];
        $_SESSION['nombre_completo'] = $result['user']['nombre_completo'];
        
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