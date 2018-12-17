'use strict';

import React from 'react';
import {View, TouchableOpacity, Image, FlatList, CameraRoll, Alert, StatusBar, Text} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import FloatButtonStyle from '../styles/FloatButtonStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GridStyle from '../styles/GridStyle';
import ToolbarStyle from '../styles/ToolbarStyle';

export default class GalleryScreen extends React.Component {
state = {photos:[], end_cursor:''};

  componentDidMount() {
    CameraRoll.getPhotos({
      first: 50, 
      assetType: 'Photos',
    })
    .then(r => {
      console.log(r);
      let photos = this.state.photos;
      for(let i = 0; i<r.edges.length; i++) {
        photos.push(r.edges[i]);
      }
      this.setState({photos:photos});
      this.setState({end_cursor:r.page_info.end_cursor});
    })
    .catch((err) => {
       Alert.alert(err);
    });
  }
  endReached = () => {
    CameraRoll.getPhotos({
      first: 50, 
      assetType: 'Photos',
      after : this.state.end_cursor
    })
    .then(r => {
      let photos = this.state.photos;
      for(let i = 0; i<r.edges.length; i++) {
        photos.push(r.edges[i]);
      }
      this.setState({photos:photos});
      this.setState({end_cursor:r.page_info.end_cursor});
    })
    .catch((err) => {
       Alert.alert(err);
    });
  }

  render() {
    return (
      <View style={GlobalStyle.container}>
        <StatusBar backgroundColor="black"/>
        <View style={ToolbarStyle.toolbarStyle}>
          <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={30} style={ToolbarStyle.toolbarIconColor}/>
          </TouchableOpacity>
          <View style={ToolbarStyle.toolbarContainer}>
            <Text style={ToolbarStyle.toolbarTitle}>اضف صوره</Text>
            <TouchableOpacity style={ToolbarStyle.toolbarIcon}>
                <Ionicons name="md-happy" size={30} style={ToolbarStyle.toolbarIconColor}/>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          onEndReached={this.endReached}
          onEndReachedThreshold={.5}
          data={this.state.photos}
          extraData={this.props.state}
          renderItem={({item}) => ( 
          <TouchableOpacity style={GridStyle.galleryContainer} onPress={() => {this.props.navigation.getParam('that').addImage(item.node.image.uri, item.node.image.width, item.node.image.height)}}>
            <Image resizeMethod="resize" blurRadius={0.5} resizeMode="cover" source={{uri: item.node.image.uri}} style={GridStyle.galleryImage}/>
            <View style={[FloatButtonStyle.container, {backgroundColor:'#27ae60',margin:0, width:30, height:30, borderRadius:15}]}>
              <Ionicons name="md-add" size={24} style={{color:'white'}} />
            </View>
          </TouchableOpacity>
          )}
          numColumns="5"
        />
      </View>
    );
  }
}
