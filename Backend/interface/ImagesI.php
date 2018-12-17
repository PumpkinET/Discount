<?php
class ImagesI {
	public $postcontentId;
	public $content;
	public $idescription;
	
	function __construct($postcontentId="", $content="", $idescription="") {
		$this->postcontentId = $postcontentId;
		$this->content = $content;
		$this->idescription = $idescription;
	}
}
?>