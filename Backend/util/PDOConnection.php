<?php
	class PDOConnection
	{
		private $host;
		private $db;
		private $charset;
		private $user;
		private $pass;
		private $connection;
		private $opt = array(
				PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC);
				
		public function __construct($host="localhost", $db="discount", $charset="utf8", $user="root", $pass="4a5awhat")
		{
			$this->host = $host;
			$this->db = $db;
			$this->charset = $charset;
			$this->user = $user;
			$this->pass = $pass;
		}
		public function connect()
		{
			if($this->connection == null) {
				$dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
				$this->connection = new PDO($dsn, $this->user, $this->pass,$this->opt);
			} else {
				return $this->connection;
			}
		}
		public function getConnection() {
			return $this->connection;
		}
		public function disconnect()
		{
			$this->connection = null;
		}
	}	
?>