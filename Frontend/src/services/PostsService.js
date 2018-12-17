export default class PostsService {
    controller = "controller/PostsController.php";
    constructor(context) {
        this.context = context;
    }
    getContext() {
        return this.context;
    }
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    getAll() {
        try {
            var xhr = new XMLHttpRequest();
            var that = this.getContext();
            that.setPosts([]);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText); 
                    obj.reverse();
                    that.setPosts(obj);
                }
            }
            xhr.open("GET", "http://10.0.0.21/discount/"+this.controller, true);
            xhr.send();
        }
        catch (exception) {
          console.log(exception);
        }
    }
    getByHashTags() {
        if(this.getContext().getMySearchHashtags().length == 0) {
            this.getAll();
            return;
        }
        try {
            var xhr = new XMLHttpRequest();
            var that = this.getContext();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    obj.reverse();
                    that.setPosts(obj);
                }
            }
            xhr.open("GET", "http://10.0.0.21/discount/"+this.controller+"?hashtags="+JSON.stringify(this.getContext().getMySearchHashtags()), true);
            xhr.send();
        }
        catch (exception) {
            console.log(exception);
        }
    }
    get(author) {
        try {
            var xhr = new XMLHttpRequest();
            var that = this.getContext();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    that.setState({posts:obj});
                }
            }
            xhr.open("GET", "http://10.0.0.21/discount/controller/PostsController.php?author="+author, true);
            xhr.send();
        }
        catch (exception) {
          console.log(exception);
        }
    }
    postImages(contents) {
        try {
            var xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4 && xhr.status === 200) 
                {
                    console.log(xhr.responseText);
                }
            }
            let formData = new FormData();

            for(i=0; i<contents.length; i++) {
                formData.append('image'+i, {uri:contents[i].uri, type:'image/jpg', name:contents[i].name+".jpg"});
            }
            
            console.log(formData);
            let postId = contents[0].postid;
            xhr.open("POST", "http://10.0.0.21/discount/controller/FilesUploadController.php?postid="+postId, true);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.send(formData); 
        }
        catch (exception) {
            console.log(exception);
        }
    }
    post(newPost) {
        try {
            var xhr = new XMLHttpRequest();
            var that = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    that.postImages(obj);    
                }
            }
            xhr.open("POST", "http://10.0.0.21/discount/"+this.controller, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 

            xhr.send("post="+JSON.stringify(newPost)); 
        }
        catch (exception) {
          console.log(exception);
        }
    }
}