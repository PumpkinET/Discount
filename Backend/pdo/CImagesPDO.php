<?php
	require_once('../util/PDOConnection.php');
	require_once('../model/Post.php');
	require_once('../interface/PostI.php');
	
	class CImagesPDO
	{
		public function get($author)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("SELECT * FROM POSTS WHERE AUTHOR=:AUTHOR");
			$statment->bindParam(':AUTHOR', $author);
			$statment->execute();
			
			$results = array();
			while ($row = $statment->fetchObject('Post')) {
				$temp = new PostI($row->getId(), $row->getAuthor(), $row->getDescription());
				$results[] = $temp;
			}
			$this->disconnect();
			return json_encode($results);
		}
		
		public function post($connection, $postId, $content)
		{
			for($i=0; $i<count($content); $i++) {
				$statment = $connection->prepare("INSERT INTO CIMAGES(ID, CONTENT, IDESCRIPTION) VALUES(:ID, :CONTENT, :IDESCRIPTION)");
				$statment->bindParam(':ID', $postId);
				$statment->bindParam(':CONTENT', $content[$i]->content);
				$statment->bindParam(':IDESCRIPTION', $content[$i]->description);
				$statment->execute();
			}
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