<?php
	//require_once('../pdo/FilesUploadPDO.php');
	
	new FilesUploadController($_SERVER['REQUEST_METHOD']);
			
	class FilesUploadController
	{
		public function __construct($request="") 
		{
			header("Content-Type: application/json; charset=UTF-8");
			
			if($request === "POST") {
				
				for($i=0; $i<count($_FILES); $i++) {
					$postId = $_GET["postid"];
					
					$file = basename($_FILES['image'.$i]['name']);
					$tmp_name = $_FILES['image'.$i]['tmp_name'];
					
					if(is_dir("../images/posts/$postId/") == false) {
						mkdir("../images/posts/$postId/");
					}
					
					if(move_uploaded_file($tmp_name,"../images/posts/$postId/".$file))
					{
					  echo json_encode(["Message" => "The file has been uploaded", "Status" => "OK"]);
					}
					else
					{
					  echo json_encode(["Message" => "sorry","Status" => "Error"]);
					}
				}				
			}
		}
	}
?>