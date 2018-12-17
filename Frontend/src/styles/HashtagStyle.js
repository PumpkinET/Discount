import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container : {
        borderBottomWidth:1, 
        borderBottomColor:'#ecf0f1',
        margin:5,
        marginBottom:15
    },
    titleStyle : {
        fontSize:18,
        color:'black',
        fontWeight:'bold',
    },
    subTitleStyle : {
        fontSize:16,
        color:'black',
        textAlign:'right',
        margin:5
    },
    subTitleStyleHashTag : {
        fontSize:16,
        color:'#2980b9',
        margin:5,
        textAlign:'right'
    },
    profileContainer : {
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    avatar: {
        width:45,
        height:45,
        borderRadius:22.5,
        marginLeft:5
    },
    cardBlock : {
        flexDirection:'row', 
        justifyContent:'flex-end', 
        alignItems:'center', 
        margin:5
    },
    cardAction : {
        margin:5,
        backgroundColor:'white',
        flexDirection:'row', 
        justifyContent:'space-around',
        alignItems:'center',
        height:50,
        
        shadowOffset: {
            width: 0, 
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3
    },
    centerRow : {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
    },
    centerColumn : {
        alignItems:'center', 
        justifyContent:'center'
    },
    border : {
        borderWidth:1,
        borderTopWidth:2,
        borderBottomWidth:2,
        borderColor:'#ecf0f1'
    }
});