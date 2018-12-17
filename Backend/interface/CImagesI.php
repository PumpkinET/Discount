<?php
class CImagesI {
	public $id;
	public $content;
	public $idescription;
	
	function __construct($id="", $content="", $idescription="") {
		$this->id = $id;
		$this->content = $content;
		$this->idescription = $idescription;
	}
}
?>