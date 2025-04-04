<?php
// backend/api/check-session.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar solicitudes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Iniciar sesión
session_start();

// Verificar si hay una sesión activa
if (isset($_SESSION['user_id']) && isset($_SESSION['timestamp'])) {
    // Verificar si la sesión ha expirado (24 horas)
    $expireTime = 24 * 60 * 60; // 24 horas en segundos
    $currentTime = time();
    
    if (($currentTime - $_SESSION['timestamp']) > $expireTime) {
        // Sesión expirada
        session_destroy();
        
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Sesión expirada'
        ]);
    } else {
        // Sesión válida, actualizar timestamp
        $_SESSION['timestamp'] = $currentTime;
        
        // Obtener información del usuario
        require_once '../config/database.php';
        
        try {
            $database = new Database();
            $db = $database->getConnection();
            
            $query = "SELECT Id, Usuario, Nombre, ApellidoP, ApellidoM, Puesto, Estatus, 
                             IdDivisionAdm, IdUnidad, IdRolSistema 
                      FROM Usuario 
                      WHERE Id = :user_id";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $_SESSION['user_id']);
            $stmt->execute();
            
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'user' => $user
                ]);
            } else {
                // Usuario no encontrado en la base de datos
                session_destroy();
                
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Usuario no encontrado'
                ]);
            }
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error al verificar sesión: ' . $e->getMessage()
            ]);
        }
    }
} else {
    // No hay sesión activa
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'No hay sesión activa'
    ]);
}