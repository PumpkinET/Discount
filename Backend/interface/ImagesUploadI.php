<?php
class ImagesUploadI {
	
	public $postid;
	public $uri;
	public $type;
	public $name;
	
	function __construct($postid="", $uri="", $type="", $name="") {
		$this->postid = $postid;
		$this->uri = $uri;
		$this->type = $type;
		$this->name = $name;
	}
}
?>