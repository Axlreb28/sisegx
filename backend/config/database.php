<?php
class Database {
    private $host = 'zealous-curran.192-99-212-154.plesk.page';
    private $db_name = 'gestionsiseg';
    private $username = 'gestion';
    private $password = 'A#AI3y~eyk20avio';
    private $port = 3306;
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name, 
                $this->username, 
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            error_log("Error de conexión: " . $exception->getMessage());
            throw new Exception("No se pudo conectar a la base de datos");
        }

        return $this->conn;
    }
}