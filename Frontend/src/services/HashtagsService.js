export default class HashtagsService {
    controller = "controller/HashtagsController.php";
    constructor(context) {
        this.context = context;
    }
    getContext() {
        return this.context;
    }
    get(keyword) {
        if(keyword == "" || keyword == " "){
            this.getContext().setState({searchHashtags:[]});
            this.getContext().setState({keyword:''});
            return;
        }
        try {
            var xhr = new XMLHttpRequest();
            var that = this.getContext();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    that.addSearchHashtag(obj);
                }
            }
            xhr.open("GET", "http://10.0.0.21/discount/" + this.controller + "?keyword="+keyword, true);
            xhr.send();
        }
        catch (exception) {
          console.log(exception);
        }
    }
}