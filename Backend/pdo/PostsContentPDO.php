<?php
	require_once('../util/PDOConnection.php');
	require_once('../interface/PostI.php');
	require_once('../interface/ImagesUploadI.php');
	
	class PostsContentPDO
	{
		public function post($connection, $postId, $images, $hashtags)
		{
			//$query = "INSERT INTO POSTSCONTENT(ID, CONTENT, IDESCRIPTION) VALUES "; 
			/*if(i == count($content)-1) {
				$query .= "($postId,$content[$i]->content, $content[$i]->idescription) ";
			}
			else {
				$query .= "($postId,$content[$i]->content, $content[$i]->idescription), ";
			}*/
			
			$temp = array();
			for($i=0; $i<count($images); $i++) {
				$statment = $connection->prepare("INSERT INTO POSTSCONTENT(POSTID, CONTENT, IDESCRIPTION, ISHASHTAG) VALUES(:POSTID, :CONTENT, :IDESCRIPTION, 0)");
				$statment->bindParam(':POSTID', $postId);
				//$statment->bindParam(':CONTENT', $images[$i]->content);
				$name = time().$i;
				$directory = "images/posts/".$postId."/".$name;
				$statment->bindParam(':CONTENT', $directory);
				$statment->bindParam(':IDESCRIPTION', $images[$i]->idescription);
				$statment->execute();
				array_push($temp, new ImagesUploadI($postId, $images[$i]->content, "image/jpg", $name));
			}
			
			for($i=0; $i<count($hashtags); $i++) {
				$statment = $connection->prepare("INSERT INTO POSTSCONTENT(POSTID, CONTENT, ISHASHTAG) VALUES(:POSTID, :CONTENT, 1)");
				$statment->bindParam(':POSTID', $postId);
				$statment->bindParam(':CONTENT', $hashtags[$i]->hashtagid);
				$statment->execute();
			}
			echo json_encode($temp);
		}
		
		public function put(PostI $post)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("UPDATE POSTS SET AUTHOR=:AUTHOR, DESCRIPTION=:DESCRIPTION, CONTENT=:CONTENT WHERE ID=:ID");
			$statment->bindParam(':AUTHOR', $post->author);
			$statment->bindParam(':DESCRIPTION', $post->description);
			$statment->bindParam(':CONTENT', $post->content);
			$statment->bindParam(':ID', $post->id);
			$statment->execute();
			
			echo "Successfully updated!";
			$this->disconnect();
		}
		
		public function delete($id)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("DELETE FROM POSTS WHERE ID=:ID");
			$statment->bindParam(':ID', $id);
			$statment->execute();
			
			echo "Successfully deleted!";
			$this->disconnect();
		}
	}
?>