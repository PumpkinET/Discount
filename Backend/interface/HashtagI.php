<?php
class HashtagI {
	public $hashtagid;
	public $categoryid;
	public $hashtag;
	
	function __construct($hashtagid="", $categoryid="", $hashtag="") {
		$this->hashtagid = $hashtagid;
		$this->categoryid = $categoryid;
		$this->hashtag = $hashtag;
	}
}
?>