import {StyleSheet} from "react-native";

export default StyleSheet.create({
    searchStyle: {
        flexDirection:'row',
        justifyContent:'space-around', 
        alignItems:'center',
        backgroundColor:'white',
        height:50,
        margin:5,

        shadowOffset: {
          width: 0, 
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3
    },
    innerStyle : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    picker : {
        height: 50, 
        width: 100,
        backgroundColor:'#ecf0f1',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1
    },
    toolbarIcon: {
        marginLeft:10,
        marginRight:10,
    },
    toolbarIconColor: {
        color:'white',
    },
    searchTitle: {
        fontSize:16, 
        color:'black',
        marginLeft:10, 
        marginRight:10, 
        fontWeight:'bold',
    },
});