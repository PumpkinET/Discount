<?php
	require_once('../util/PDOConnection.php');
	require_once('../model/Post.php');
	require_once('../interface/PostI.php');
	require_once('../model/Hashtag.php');
	require_once('../interface/HashtagI.php');
	require_once('../interface/ImagesI.php');
	require_once('../pdo/PostsContentPDO.php');
	
	class PostsPDO extends PDOConnection 
	{
		public function getAll()
		{
			$this->connect();
			
			$statment = $this->getConnection()->prepare("
			SELECT 
			post.id, 
			author.author, 
			author.avatar,
			author.location, 
			author.phone,
			author.status,
			post.description,
			postscontent.postcontentid, 
			postscontent.content,
			postscontent.idescription,
			postscontent.ishashtag,
			hashtag.hashtagid, 
			hashtag.hashtag,
			hashtag.categoryid
			FROM POSTS post 
			INNER JOIN POSTSCONTENT postscontent ON post.id=postscontent.postid 
			INNER JOIN AUTHORS author ON post.author=author.author 
			INNER JOIN HASHTAGS hashtag ON hashtag.hashtagid= CASE WHEN postscontent.ishashtag=1 THEN postscontent.content ELSE 0 END 
			ORDER BY postscontent.postid");
			
			$statment->execute();
			$temp;
			$results = array();
			$i = 0;
			$lastRow = 0;
			while ($row = $statment->fetchObject('Post')) {
				if($i == 0 || $lastRow != $row->getId()) {
					$temp = new PostI($row->getId(), $row->getAuthor(), $row->getAvatar(), $row->getLocation(), $row->getStatus(), $row->getDescription(), $row->getPhone());
					if($row->getIsHashtag() == 0) {
						array_push($temp->images, new ImagesI($row->getPostContentId(),"http://10.0.0.21/discount/".$row->getContent().".jpg", $row->getIDescription()));
					}
					else {
						array_push($temp->hashtags, new HashtagI($row->getHashTagId(),$row->getCategoryID(), $row->getHashtag()));
					}
					$results[] = $temp;
				} else {
					if($row->getIsHashtag() == 0) {
						array_push($temp->images, new ImagesI($row->getPostContentId(),"http://10.0.0.21/discount/".$row->getContent().".jpg", $row->getIDescription()));
					}
					else {
						array_push($temp->hashtags, new HashtagI($row->getHashTagId(),$row->getCategoryID(), $row->getHashtag()));
					}
				}
				$i++;
				$lastRow = $row->getId();
			}
			$this->disconnect();
			return json_encode($results);
		}
		public function get($author)
		{	
			$this->connect();
			
			$statment = $this->getConnection()->prepare("
			SELECT 
			post.id, 
			author.author, 
			author.avatar,
			author.location, 
			author.phone, 
			author.status,
			post.description,
			postscontent.postcontentid, 
			postscontent.content,
			postscontent.idescription,
			postscontent.ishashtag,
			hashtag.hashtagid, 
			hashtag.hashtag,
			hashtag.categoryid
			FROM POSTS post 
			INNER JOIN POSTSCONTENT postscontent ON post.id=postscontent.postid 
			INNER JOIN AUTHORS author ON post.author=author.author 
			INNER JOIN HASHTAGS hashtag ON hashtag.hashtagid= CASE WHEN postscontent.ishashtag=1 THEN postscontent.content ELSE 0 END 
			WHERE post.author=:AUTHOR ORDER BY postscontent.postid");
			$statment->bindParam(":AUTHOR", $author);
			
			$statment->execute();
			$temp;
			$results = array();
			$i = 0;
			$lastRow = 0;
			while ($row = $statment->fetchObject('Post')) {
				if($i == 0 || $lastRow != $row->getId()) {
					$temp = new PostI($row->getId(), $row->getAuthor(), $row->getAvatar(), $row->getLocation(), $row->getStatus(), $row->getDescription(), $row->getPhone());
					if($row->getIsHashtag() == 0) {
						array_push($temp->images, new ImagesI($row->getPostContentId(),"http://10.0.0.21/discount/".$row->getContent().".jpg", $row->getIDescription()));
					}
					else {
						array_push($temp->hashtags, new HashtagI($row->getHashTagId(),$row->getCategoryID(), $row->getHashtag()));
					}
					$results[] = $temp;
				} else {
					if($row->getIsHashtag() == 0) {
						array_push($temp->images, new ImagesI($row->getPostContentId(),"http://10.0.0.21/discount/".$row->getContent().".jpg", $row->getIDescription()));
					}
					else {
						array_push($temp->hashtags, new HashtagI($row->getHashTagId(),$row->getCategoryID(), $row->getHashtag()));
					}
				}
				$i++;
				$lastRow = $row->getId();
			}
			$this->disconnect();
			return json_encode($results);
		}
		
		
		public function getByHashTags($myhashtags)
		{	
			$this->connect();
			
			$toArray = json_decode($myhashtags);
			$query = "postscontent.content = " . $toArray[0]->hashtagid." ";
			
			for($i = 1; $i<count($toArray); $i++) {
				$query .= "OR postscontent.content = ".$toArray[$i]->hashtagid." ";
			}
			$statment = $this->getConnection()->prepare("
			SELECT 
			post.id, 
			author.author, 
			author.avatar,
			author.location, 
			author.phone, 
			author.status,
			post.description,
			postscontent.postcontentid, 
			postscontent.content,
			postscontent.idescription,
			postscontent.ishashtag,
			hashtag.hashtagid, 
			hashtag.hashtag,
			hashtag.categoryid
			FROM POSTS post 
			INNER JOIN POSTSCONTENT postscontent ON post.id=postscontent.postid 
			INNER JOIN AUTHORS author ON post.author=author.author 
			INNER JOIN HASHTAGS hashtag ON hashtag.hashtagid= CASE WHEN postscontent.ishashtag=1 THEN postscontent.content ELSE 0 END 
			WHERE postscontent.postid IN(SELECT postid FROM POSTSCONTENT WHERE ".$query." ) ORDER BY postscontent.postid");

			$statment->execute();
			$temp;
			$results = array();
			$i = 0;
			$lastRow = 0;
			while ($row = $statment->fetchObject('Post')) {
				if($i == 0 || $lastRow != $row->getId()) {
					$temp = new PostI($row->getId(), $row->getAuthor(), $row->getAvatar(), $row->getLocation(), $row->getStatus(), $row->getDescription(), $row->getPhone());
					if($row->getIsHashtag() == 0) {
						array_push($temp->images, new ImagesI($row->getPostContentId(),"http://10.0.0.21/discount/".$row->getContent().".jpg", $row->getIDescription()));
					}
					else {
						array_push($temp->hashtags, new HashtagI($row->getHashTagId(),$row->getCategoryID(), $row->getHashtag()));
					}
					$results[] = $temp;
				} else {
					if($row->getIsHashtag() == 0) {
						array_push($temp->images, new ImagesI($row->getPostContentId(),"http://10.0.0.21/discount/".$row->getContent().".jpg", $row->getIDescription()));
					}
					else {
						array_push($temp->hashtags, new HashtagI($row->getHashTagId(),$row->getCategoryID(), $row->getHashtag()));
					}
				}
				$i++;
				$lastRow = $row->getId();
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
			
			$postsContentPDO = new PostsContentPDO();
			$postsContentPDO->post($this->getConnection(), $this->getConnection()->lastInsertId(), $post->images, $post->hashtags);
			$this->disconnect();
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