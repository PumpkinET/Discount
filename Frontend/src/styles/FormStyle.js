import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container : {
        borderRadius:4, 
        backgroundColor:'black', 
        width:'90%', 
        height:40,
        margin:5, 
        justifyContent:'center', 
        alignItems:'center', 
        paddingRight:5
    },
    transparentContainer : {
        borderRadius:4, 
        backgroundColor:'transparent', 
        width:'90%', 
        height:20,
        margin:5, 
        justifyContent:'center', 
        alignItems:'center', 
    },
    textInputContainer: {
        backgroundColor:'white',
        width:'90%',
        height:40,
        margin:5,
        textAlign:'right',
        borderBottomWidth:1
    },
    titleContainer : {
        margin: 5, 
        justifyContent:'center', 
        alignItems:'center'
    },
    title: {
        color:'black', 
        fontSize:30, 
        margin:5, 
        fontWeight:'bold'
    },
    coverTitle: {
        color:'black', 
        fontSize:20, 
        margin:5, 
        fontWeight:'bold'
    }
});