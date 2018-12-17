import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor:'black',
        position:'absolute', 
        left:0, 
        top:0, 
        width:40, 
        height:40, 
        borderRadius:20,  
        justifyContent:'center', 
        alignItems:'center',

        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5, 
        shadowOpacity: 5.0,
        elevation: 5,
    },
    bottomContainer: {
        marginLeft:50,
        backgroundColor:'#2980b9',
        position:'absolute', 
        left:0, 
        top:0, 
        width:50, 
        height:50, 
        
        justifyContent:'center', 
        alignItems:'center',

        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 1,
        shadowOpacity: 1.0,
        elevation: 1,
    },
    innerContainer : {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between'
    },
    imageStyle: {
        width   : 50,
        height  : 50,
    },
    titleStyle : {
        fontSize:18,
        color:'black',
        fontWeight:'bold',
    },
    iconStyle : {
        marginLeft:10
    },
    childrenContainer : {
        marginRight:0
    }
});