<?php
	require_once('../pdo/HashtagsPDO.php');
	
	new HashtagsController($_SERVER['REQUEST_METHOD']);
			
	class HashtagsController
	{
		public function __construct($request="") 
		{
			header("Content-Type: application/json; charset=UTF-8");
			
			if($request === "GET") {
				$hashtagsPDO = new HashtagsPDO();
				
				if(isset($_GET["keyword"]))
					echo $hashtagsPDO->get($_GET["keyword"]);
			}
			else if($request === "POST") {
				$postsPDO = new PostsPDO();
				
				//echo $_POST["post"];
				$post = json_decode($_POST["post"]);

				echo $postsPDO->post(new PostI("", $post->author, "", "", $post->description, $post->images));
			}
			else if($request === "PUT") {
				$postsPDO = new PostsPDO();
				
				parse_str(file_get_contents("php://input"),$put_vars);
				$post = json_decode($put_vars["post"]);
				$postsPDO->put(new PostI($post->id, $post->author, $post->description));
			}
			else if($request === "DELETE") {
				$postsPDO = new PostsPDO();
				
				parse_str(file_get_contents("php://input"),$delete_vars);
				$post = json_decode($delete_vars["post"]);
				$postsPDO->delete($post->id);
			}
		}
	}
?>