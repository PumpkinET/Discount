'use strict';

import React from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image, FlatList, TextInput, Alert, AsyncStorage, ImageEditor, StatusBar} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import FloatButtonStyle from '../styles/FloatButtonStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostsService from '../services/PostsService';
import NewPost from '../models/NewPost';
import PostImage from '../models/PostImage';
import TextInputStyle from '../styles/TextInputStyle';
import CommercialCardStyle from '../styles/CommercialCardStyle';
import HashtagStyle from '../styles/HashtagStyle';
import ToolbarStyle from '../styles/ToolbarStyle';
import ApplicationContext from '../states/ApplicationContext';

export default class AddCommercialScreen extends ApplicationContext {

state = {author:'', avatar:null, description:'', images:[]};

  componentDidMount() {
    AsyncStorage.getItem("author").then((goals) => {
      let me = JSON.parse(goals);
      this.setState({author : me.author});
      this.setState({avatar : me.avatar});
    }).catch((error) => {
      console.log('Promise is rejected with error: ' + error);
    });
  }
  addImage(content, width, height) {
    console.log(content.size);
    let currentImages = this.state.images;

    let cropData = {
      offset:{x:0,y:0},
      size:{width:width, height:height},
      displaySize: {width: width*0.35, height: height*0.35},
    }
    ImageEditor.cropImage(content, 
      cropData, (successURI) => {
        currentImages.push(new PostImage(successURI, ''));
        this.setState({images:currentImages});
      }, 
      (error) =>{console.log('cropImage,',error)}
    )

  }
  removeImage(index) {
    let currentImages = this.state.images;
    currentImages.splice(index, 1);
    this.setState({images:currentImages});
  }
  updateDescription(index ,idescription) {
    let currentImages = this.state.images;
    currentImages[index].idescription = idescription;
    this.setState({images:currentImages});
  }
  
  post() {
    Alert.alert("Posting..");
    let currentImages = this.state.images;
    let currentHashtags = this.getContext().getNewPostHashtags();
    let newPost = new NewPost("", this.state.author, this.state.description, currentImages, currentHashtags);
    new PostsService(this).post(newPost);
    this.props.navigation.goBack();
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
            <Text style={ToolbarStyle.toolbarTitle}>اضف اعلان</Text>
            <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>this.post()}>
                <Ionicons name="md-checkmark" size={30} style={ToolbarStyle.toolbarIconColor}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{margin:5}}>
          <TouchableOpacity style={CommercialCardStyle.profileContainer}>
            <Text style={CommercialCardStyle.titleStyle}>{this.state.author}</Text>
            {
              this.state.avatar && 
              <Image resizeMethod="resize" source={{uri: this.state.avatar}} style={CommercialCardStyle.avatar}  />
            }
          </TouchableOpacity>

          <TextInput
            underlineColorAndroid="transparent"
            multiline={true}
            style={TextInputStyle.container}
            onChangeText={(text) => this.setState({description:text})}
            value={this.state.description}
            placeholder="وصف المنشور"
          />
          <FlatList
            data={this.getContext().getNewPostHashtags()} 
            extraData={this.getContext().state}
            renderItem={({item}) => (
            <View>
              <Text style={HashtagStyle.subTitleStyleHashTag}>#{item.hashtag}</Text>
            </View>
            )}
          />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            inverted="-1"
            data={this.state.images} 
            extraData={this.state}
            renderItem={({item, index}) => (
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                multiline={false}
                style={TextInputStyle.subContainer}
                onChangeText={(text) => this.updateDescription(index, text)}
                value={item.idescription}
                placeholder="وصف الصوره"
              />
              <Image resizeMethod="resize" resizeMode="cover" source={{uri: item.content}} style={{width:225, height:225}}/>
              <TouchableOpacity style={[FloatButtonStyle.container, {width:30, height:30, borderRadius:15}]} onPress={() => {this.removeImage(index)}}>
                <Ionicons name="md-remove" size={24} style={{color:'white'}} />
              </TouchableOpacity>
            </View>
            )}
          />
          <View style={CommercialCardStyle.cardAction}>
            <TouchableOpacity style={CommercialCardStyle.cardActionButton} onPress={()=>this.props.navigation.navigate('SearchScreen', {newPost:true})}>
              <Text style={CommercialCardStyle.cardActionTitle}>اضف رموز</Text>
              <Ionicons name="md-quote" size={24} style={GlobalStyle.greyIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={CommercialCardStyle.cardActionButton} onPress={()=>this.props.navigation.navigate('GalleryScreen', {that:this})}>
              <Text style={CommercialCardStyle.cardActionTitle}>اضف صور</Text>
              <Ionicons name="md-image" size={24} style={GlobalStyle.greyIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
