<?php
class Hashtag {
	protected $hashtagid;
	protected $categoryid;
	protected $hashtag;
	
	public function getHashTagId() {
		return $this->hashtagid;
	}
	
	public function getCategoryId() {
		return $this->categoryid;
	}
	
	public function getHashtag() {
		return $this->hashtag;
	}
}
?>