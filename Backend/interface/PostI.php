<?php
class PostI {
	public $id;
	public $author;
	public $avatar;
	public $location;
	public $status;
	public $description;
	public $phone; 
	public $images=array();
	public $hashtags=array();
	
	function __construct($id="", $author="", $avatar="", $location="", $status="", $description="", $phone, $images=[], $hashtags=[]) {
		$this->id = $id;
		$this->author = $author;
		$this->location = $location;
		$this->avatar = $avatar;
		$this->status = $status;
		$this->description = $description;
		$this->phone = $phone;
		$this->images = $images;
		$this->hashtags = $hashtags;
	}
}
?>