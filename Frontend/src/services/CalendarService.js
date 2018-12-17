export default class CalendarService {
    controller = "controller/CalendarController.php";
    constructor(context) {
        this.context = context;
    }
    getContext() {
        return this.context;
    }
    getAll() {
        try {
            var xhr = new XMLHttpRequest();
            var that = this.getContext();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    that.setState({items:obj});
                }
            }
            
            xhr.open("GET", "http://10.0.0.21/discount/"+this.controller, true);
            xhr.send();
        }
        catch (exception) {
            console.log(exception);
        }
    }
}