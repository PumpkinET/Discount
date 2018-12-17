import {StyleSheet, Dimensions} from "react-native";

export default StyleSheet.create({
    profilePostStyle : {
        width: Dimensions.get('window').width/3,
        height: Dimensions.get('window').width/3,
        borderWidth:2.5,
        borderTopWidth:5,
        borderBottomWidth:5,
        borderColor:'white'
    },
    profilePostImageStyle : {
        flex:1,
        width:null
    },

    galleryContainer : {
        width: Dimensions.get('window').width/5,
        height: Dimensions.get('window').width/5,
        borderWidth:2.5,
        borderTopWidth:5,
        borderBottomWidth:5,
        borderColor:'white'
    },
    galleryImage : {
        flex:1,
        width:null
    },
});