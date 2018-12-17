<?php
class HandleResponse {
	public $status;
	public $description;
	
	function __construct($status="", $description="") {
		$this->status = $status;
		$this->description = $description;
	}
}
?>