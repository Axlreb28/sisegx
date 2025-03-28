<?php
// backend/api/logout.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

session_start();
session_destroy();

echo json_encode([
    'success' => true,
    'message' => 'Sesión cerrada exitosamente'
]);