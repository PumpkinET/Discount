'use strict';

class PostI {
    constructor(id, author, description, content) {
		this.id = id;
        this.author = author;
		this.description = description;
		this.content = content;
    }
}
class ImagesI {
	constructor(content, description) {
		this.content = content;
		this.description = description;
	}
}

function getAll() {
	try {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				var obj = JSON.parse(xhr.responseText);
				document.getElementById("getAll").innerHTML = xhr.responseText;
			}
		}
		
		xhr.open("GET", "controller/PostsController.php", true);
		xhr.send();
	}
	catch (exception) 
	{
		alert("Request failed");
	}
}

function get() {
	try {
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				var obj = JSON.parse(xhr.responseText);
				document.getElementById("get").innerHTML = xhr.responseText;
			}
		}
		
		xhr.open("GET", "controller/PostsController.php?author=George", true);
		xhr.send();
	}
	catch (exception) 
	{
		alert("Request failed");
	}
}

function post() {
	try {
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				console.log(xhr.responseText);
			}
		}
		var content = [];
		content.push(new ImagesI("description1", "content1"));
		content.push(new ImagesI("description2", "content2"));
		content.push(new ImagesI("description3", "content3"));
		post = new PostI("", "Shadi", "description", content);
		
		xhr.open("POST", "controller/PostsController.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("post="+JSON.stringify(post));
	}
	catch (exception) 
	{
		alert(exception);
	}
}

function put() {
	try {
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				console.log(xhr.responseText);
			}
		}
		
		post = new PostI("23", "Shadi", "XD", "content");
		
		xhr.open("PUT", "controller/PostsController.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("post="+JSON.stringify(post));
	}
	catch (exception) 
	{
		alert("Request failed");
	}
}

function _delete() {
	try {
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				console.log(xhr.responseText);
			}
		}
		content = 
		post = new PostI("23", "Shadi", "XD");
		
		xhr.open("DELETE", "controller/PostsController.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("post="+JSON.stringify(post));
	}
	catch (exception) 
	{
		alert("Request failed");
	}
}