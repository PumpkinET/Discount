<?php
class Calendar {
	protected $id;
	protected $author;
	protected $avatar;
	protected $location;
	protected $description;
	protected $year;
	protected $month;
	protected $day;
	protected $hour;
	protected $calendarid;
	protected $content;
	protected $idescription;
	
	public function getId() {
		return $this->id;
	}
	
	public function getAuthor() {
		return $this->author;
	}
	
	public function getAvatar() {
		return $this->avatar;
	}
	
	public function getLocation() {
		return $this->location;
	}
	
	public function getDescription() {
		return $this->description;
	}
	
	public function getYear() {
		return $this->year;
	}
	
	public function getMonth() {
		return $this->month;
	}
	
	public function getDay() {
		return $this->day;
	}
	
	public function getHour() {
		return $this->hour;
	}
	
	public function getCalendarId() {
		return $this->calendarid;
	}
	
	public function getContent() {
		return $this->content;
	}
	
	public function getIDescription() {
		return $this->idescription;
	}

}
?>