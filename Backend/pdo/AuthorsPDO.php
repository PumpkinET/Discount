<?php
	require_once('../util/PDOConnection.php');
	require_once('../model/Author.php');
	require_once('../interface/AuthorI.php');
	require_once('../interface/HandleResponse.php');
	
	class AuthorsPDO extends PDOConnection 
	{
		public function login($username, $password) {
			$this->connect();
			$statment = $this->getConnection()->prepare("SELECT * FROM AUTHORS WHERE USERNAME=:USERNAME AND PASSWORD=:PASSWORD");
			$statment->bindParam(':USERNAME', $username);
			$statment->bindParam(':PASSWORD', $password);
			$statment->execute();
			
			$count = 0;
			$temp;
			while($row = $statment->fetchObject('Author')) {
				$count++;
				$temp = new AuthorI($row->getUsername(), $row->getPassword(), $row->getAuthor(), $row->getAvatar(), $row->getPhone(), $row->getLocation(), $row->getStatus());
			}
			$this->disconnect();
			if($count == 1) {
				session_start();
				$_SESSION['author'] = $temp;
				return json_encode(new HandleResponse("true", $temp));
			} else {
				return json_encode(new HandleResponse("false", "Wrong username or password"));
			}
		}
	}
?>