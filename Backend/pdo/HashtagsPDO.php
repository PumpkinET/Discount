<?php
	require_once('../util/PDOConnection.php');
	require_once('../model/Hashtag.php');
	require_once('../interface/HashtagI.php');
	
	class HashtagsPDO extends PDOConnection 
	{
		public function get($keyword)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("SELECT * FROM HASHTAGS WHERE HASHTAG LIKE CONCAT('%', :KEYWORD,'%')");
			$statment->bindParam(":KEYWORD", $keyword);
			$statment->execute();
			$temp;
			$results = array();
			while ($row = $statment->fetchObject('Hashtag')) {
				$temp = new HashtagI($row->getHashTagId(), $row->getCategoryId(), $row->getHashtag());
				$results[] = $temp;
			}
			
			$this->disconnect();
			return json_encode($results);
		}
		
		public function post(PostI $post)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("INSERT INTO POSTS(AUTHOR, DESCRIPTION) VALUES(:AUTHOR, :DESCRIPTION)");
			$statment->bindParam(':AUTHOR', $post->author);
			$statment->bindParam(':DESCRIPTION', $post->description);
			$statment->execute();
			
			$imagesPDO = new ImagesPDO();
			$imagesPDO->post($this->getConnection(), $this->getConnection()->lastInsertId(), $post->images);
			$this->disconnect();
		}
	}
?>