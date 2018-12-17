<?php
	require_once('../pdo/AuthorsPDO.php');
	
	new AuthorsController($_SERVER['REQUEST_METHOD']);
			
	class AuthorsController
	{
		public function __construct($request="") 
		{
			header("Content-Type: application/json; charset=UTF-8");
			
			if($request === "POST") {
				$authorsPDO = new AuthorsPDO();

				$author = json_decode($_POST["author"]);
				echo $authorsPDO->login($author->username, $author->password);
			}
		}
	}
?>