<?php
class Post {
	protected $id;
	protected $author;
	protected $avatar;
	protected $location;
	protected $phone;
	protected $status;
	protected $description;
	protected $postcontentid;
	protected $content;
	protected $idescription;
	protected $ishashtag;
	protected $hashtag;
	protected $hashtagid;
	protected $categoryid;
	
	public function getId() {
		return $this->id;
	}
	
	public function getAuthor() {
		return $this->author;
	}
	
	public function getAvatar() {
		return $this->avatar;
	}
	
	public function getLocation() {
		return $this->location;
	}
	
	public function getDescription() {
		return $this->description;
	}
	
	public function getPostContentId() {
		return $this->postcontentid;
	}
	
	public function getContent() {
		return $this->content;
	}
	
	public function getIDescription() {
		return $this->idescription;
	}
	
	public function getPhone() {
		return $this->phone;
	}
	
	public function getStatus() {
		return $this->status;
	}
	
	public function getIsHashTag() {
		return $this->ishashtag;
	}
	
	public function getHashtag() {
		return $this->hashtag;
	}
	
	public function getHashtagId() {
		return $this->hashtagid;
	}

	public function getCategoryId() {
		return $this->categoryid;
	}
}
?>