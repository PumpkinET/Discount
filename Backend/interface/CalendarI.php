<?php
class CalendarI {
	public $id;
	public $author;
	public $avatar;
	public $location;
	public $description;
	public $year;
	public $month;
	public $day;
	public $hour;
	public $images=array();
	
	function __construct($id="", $author="", $avatar="", $location="", $description="", $year="", $month="", $day="", $hour="") {
		$this->id = $id;
		$this->author = $author;
		$this->location = $location;
		$this->avatar = $avatar;
		$this->description = $description;
		
		$this->year = $year;
		$this->month = $month;
		$this->day = $day;
		$this->hour = $hour;
		
	}
}
?>