<?php
	require_once('../pdo/PostsPDO.php');
	
	new PostsController($_SERVER['REQUEST_METHOD']);
			
	class PostsController
	{
		public function __construct($request="") 
		{
			header("Content-Type: application/json; charset=UTF-8");
			
			if($request === "GET") {
				$postsPDO = new PostsPDO();
				
				if(isset($_GET["author"]))
					echo $postsPDO->get($_GET["author"]);
				else if(isset($_GET["hashtags"])) {
					echo $postsPDO->getByHashtags($_GET["hashtags"]);
				}
				else
					echo $postsPDO->getAll();
			}
			else if($request === "POST") {
				$postsPDO = new PostsPDO();
				
				$post = json_decode($_POST["post"]);
				
				echo $postsPDO->post(new PostI("", $post->author, "", "", "", $post->description, "", $post->images, $post->hashtags));
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