<?php
	require_once('../util/PDOConnection.php');
	require_once('../model/Calendar.php');
	require_once('../interface/CalendarI.php');
	require_once('../interface/CImagesI.php');
	require_once('../pdo/CImagesPDO.php');
	
	class CalendarPDO extends PDOConnection 
	{
		public function getAll()
		{
			$this->connect();
			
			$statment = $this->getConnection()->prepare("
			SELECT 
			calendar.id, 
			author.author, 
			author.avatar ,
			author.location,
			calendar.description,
			calendar.year,
			calendar.month,
			calendar.day,
			calendar.hour,
			image.calendarid,
			image.content, 
			image.idescription 
			FROM Calendar calendar 
			INNER JOIN CIMAGES image ON calendar.id=image.id 
			INNER JOIN AUTHORS author ON calendar.author=author.author");
			
			$statment->execute();
			$temp;
			$results = array();
			$i = 0;
			$lastRow = 0;
			while ($row = $statment->fetchObject('Calendar')) {
				if($i == 0 || $lastRow != $row->getId()) {
					$temp = new CalendarI($row->getId(), $row->getAuthor(), $row->getAvatar(), $row->getLocation(),$row->getDescription(), $row->getYear(), $row->getMonth(), $row->getDay(), $row->getHour());
					array_push($temp->images, new CImagesI($row->getCalendarId(),$row->getContent(), $row->getIDescription()));
					$results[] = $temp;
				} else {
					array_push($temp->images, new CImagesI($row->getCalendarId(),$row->getContent(), $row->getIDescription()));
				}
				$i++;
				$lastRow = $row->getId();
			}
			
			$this->disconnect();
			return json_encode($results);
		}
		public function get($author)
		{	
			$this->connect();
			
			$statment = $this->getConnection()->prepare("
			SELECT 
			calendar.id, 
			author.author, 
			author.avatar ,
			author.location,
			calendar.description,
			calendar.year,
			calendar.month,
			calendar.day,
			calendar.hour,
			image.calendarid,
			image.content, 
			image.idescription 
			FROM Calendar calendar 
			INNER JOIN CIMAGES image ON calendar.id=image.id 
			INNER JOIN AUTHORS author ON calendar.author=author.author WHERE calendar.author=:AUTHOR");
			
			$statment->bindParam(':AUTHOR', $author);
			$statment->execute();
			$temp;
			$results = array();
			$i = 0;
			$lastRow = 0;
			while ($row = $statment->fetchObject('Calendar')) {
				if($i == 0 || $lastRow != $row->getId()) {
					$temp = new CalendarI($row->getId(), $row->getAuthor(), $row->getAvatar(), $row->getLocation(),$row->getDescription(), $row->getYear(), $row->getMonth(), $row->getDay(), $row->getHour());
					array_push($temp->images, new CImagesI($row->getCalendarId(),$row->getContent(), $row->getIDescription()));
					$results[] = $temp;
				} else {
					array_push($temp->images, new CImagesI($row->getCalendarId(),$row->getContent(), $row->getIDescription()));
				}
				$i++;
				$lastRow = $row->getId();
			}
			
			$this->disconnect();
			return json_encode($results);
		}
		
		public function post(CalendarI $calendar)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("INSERT INTO CALENDAR(AUTHOR, DESCRIPTION, YEAR, MONTH, DAY, HOUR) VALUES(:AUTHOR, :DESCRIPTION, :YEAR, :MONTH, :DAY, :HOUR)");
			$statment->bindParam(':AUTHOR', $calendar->author);
			$statment->bindParam(':DESCRIPTION', $calendar->description);
			$statment->bindParam(':YEAR', $calendar->year);
			$statment->bindParam(':MONTH', $calendar->month);
			$statment->bindParam(':DAY', $calendar->day);
			$statment->bindParam(':HOUR', $calendar->hour);
			$statment->execute();
			
			$cImagesPDO = new CImagesPDO();
			$cImagesPDO->post($this->getConnection(), $this->getConnection()->lastInsertId(), $post->content);
			$this->disconnect();
		}
		
		/*public function put(PostI $post)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("UPDATE POSTS SET AUTHOR=:AUTHOR, DESCRIPTION=:DESCRIPTION, CONTENT=:CONTENT WHERE ID=:ID");
			$statment->bindParam(':AUTHOR', $post->author);
			$statment->bindParam(':DESCRIPTION', $post->description);
			$statment->bindParam(':CONTENT', $post->content);
			$statment->bindParam(':ID', $post->id);
			$statment->execute();
			
			echo "Successfully updated!";
			$this->disconnect();
		}*/
		
		public function delete($id)
		{	
			$this->connect();
			$statment = $this->getConnection()->prepare("DELETE FROM POSTS WHERE ID=:ID");
			$statment->bindParam(':ID', $id);
			$statment->execute();
			
			echo "Successfully deleted!";
			$this->disconnect();
		}
	}
?>