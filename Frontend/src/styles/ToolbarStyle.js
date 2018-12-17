import {StyleSheet} from "react-native";

export default StyleSheet.create({
    toolbarContainer:  {
        flex:1, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'flex-end'
    },
    toolbarStyle: {
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
        backgroundColor:'white',
        height:50,
        
        shadowOffset: {
          width: 0, 
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3
    },
    toolbarIcon: {
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        alignItems:'center'
    },
    toolbarIconColor: {
        color:'black',
    },
    toolbarTitle: {
        fontSize:20, 
        color:'black',
        marginLeft:10, 
        marginRight:10, 
        fontWeight:'bold',
    },
    subToolbarTitle: {
        flex:1,
        fontSize:14,
        color:'#bdc3c7',
        marginLeft:10, 
        marginRight:10,
    },
});