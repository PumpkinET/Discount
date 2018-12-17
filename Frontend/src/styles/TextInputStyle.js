import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container : {
        height: 80, 
        margin:5, 
        borderColor:'#ecf0f1', 
        borderWidth:0, 
        textAlign:'right', 
        textAlignVertical:'top'
    },
    subContainer : {
        flex:1,
        flexDirection:'row',
        height: 40, 
        margin:5,
        color:'black',
        borderColor:'#ecf0f1', 
        borderWidth:1, 
        textAlign:'right', 
        textAlignVertical:'top'
    },
    toolbarContainer : {
        width:40,
        flex:1,
        textAlign:'right', 
    }
});