<?php
class Author {
	protected $username;
	protected $password;
	protected $author;
	protected $avatar;
	protected $phone;
	protected $location;
	protected $status;
	
	public function getUsername() {
		return $this->username;
	}
	
	public function getPassword() {
		return $this->password;
	}
	
	public function getAuthor() {
		return $this->author;
	}
	
	public function getAvatar() {
		return $this->avatar;
	}
	
	public function getPhone() {
		return $this->phone;
	}
	
	public function getLocation() {
		return $this->location;
	}
	
	public function getStatus() {
		return $this->status;
	}
}
?>