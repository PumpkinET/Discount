<?php
class AuthorI {
	public $username;
	public $password;
	public $author;
	public $avatar;
	public $phone;
	public $location;
	public $status;
	
	function __construct($username="", $password="", $author="", $avatar="", $phone="", $location="", $status="") {
		$this->username = $username;
		$this->password = $password;
		$this->author = $author;
		$this->avatar = $avatar;
		$this->phone = $phone;
		$this->location = $location;
		$this->status = $status;
	}
}
?>