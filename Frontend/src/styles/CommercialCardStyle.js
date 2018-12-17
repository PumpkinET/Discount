import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container : {
        borderBottomWidth:20, 
        borderBottomColor:'#ecf0f1'
    },
    titleStyle : {
        fontSize:18,
        color:'black',
        fontWeight:'bold',
        textAlign:'right',
    },
    subTitleStyle : {
        fontSize:16,
        color:'black',
        textAlign:'right',
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
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:5
    },
    cardBlock : {
        flexDirection:'row', 
        justifyContent:'flex-end', 
        alignItems:'center', 
        margin:5
    },
    cardAction : {
        flex:1,
        marginTop:10,
        backgroundColor:'white',
        flexDirection:'row', 
        justifyContent:'flex-end',
        borderTopWidth:1, 
        borderTopColor:'#ecf0f1',
    },
    centerRow : {
        flexWrap:'wrap',
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'flex-end'
    },
    centerColumn : {
        alignItems:'center', 
        justifyContent:'center'
    },
    cardActionButton : {
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'center',
        padding:10
    },
    cardActionTitle: {
        color:'#7f8c8d',
        marginRight:5
    },
    modalTitle : {
        color:'black',
        margin: 5
    },
});