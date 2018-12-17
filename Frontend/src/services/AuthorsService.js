import {AsyncStorage, Alert} from 'react-native';
import Author from "../models/Author";
import Login from "../models/Login";

export default class AuthorsService {
    controller = "controller/AuthorsController.php";
    constructor(context) {
        this.context = context;
    }
    getContext() {
        return this.context
    }
    login(username, password) {
        try {
            var xhr = new XMLHttpRequest();
            var that = this.getContext();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.status == "true") { 
                        that.setState({profile:
                            new Author(
                                obj.description.username, 
                                obj.description.password, 
                                obj.description.author,
                                obj.description.avatar, 
                                obj.description.phone,
                                obj.description.location,
                                obj.description.status)
                            }
                        );
                        AsyncStorage.removeItem("author");
                        AsyncStorage.setItem("author", JSON.stringify(obj.description));
                        that.props.navigation.navigate('TabNavigator');
                    } else {
                        Alert.alert(obj.description + "");
                    }
                }
            }
            xhr.open("POST", "http://10.0.0.21/discount/"+this.controller, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("author="+JSON.stringify(new Login(username, password)));
        }
        catch (exception) {
          console.log(exception);
        }
    }
}