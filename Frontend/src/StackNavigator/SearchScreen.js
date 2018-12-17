import React from 'react';
import {View, FlatList, TouchableOpacity, Text, TextInput, StatusBar} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import ApplicationContext from '../states/ApplicationContext';
import HashtagStyle from '../styles/HashtagStyle';
import HashtagsService from '../services/HashtagsService';
import Hashtag from '../models/Hashtag';
import TextInputStyle from '../styles/TextInputStyle';
import ToolbarStyle from '../styles/ToolbarStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostsService from '../services/PostsService';
export default class SearchScreen extends ApplicationContext {

  state = {keyword:'', searchHashtags:null};
  
  addSearchHashtag(searchHashtags) {
    this.setState({searchHashtags:searchHashtags});
  }

  render() {
    if(this.props.navigation.getParam('newPost')) {
      return (
        <View style={GlobalStyle.container}>
        
          <StatusBar backgroundColor="black"/>
  
          <View style={ToolbarStyle.toolbarStyle}>
            <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>this.props.navigation.goBack()}>
                <Ionicons name="md-arrow-back" size={30} style={ToolbarStyle.toolbarIconColor}/>
            </TouchableOpacity>
            <View style={ToolbarStyle.toolbarContainer}>
              <TextInput
                autoFocus
                underlineColorAndroid="transparent"
                placeholder="ابحث عن رموز"
                style={[TextInputStyle.subContainer, {borderWidth:0, textAlign:'right'}]}
                onChangeText={(keyword) => {this.setState({keyword : keyword}); new HashtagsService(this).get(keyword);}}
                value={this.state.keyword}
              />
              <View style={ToolbarStyle.toolbarIcon}>
                <Ionicons name="md-happy" size={30} style={ToolbarStyle.toolbarIconColor}/>
              </View>
            </View>
          </View>
  
          <FlatList
            data={this.getContext().getNewPostHashtags()}
            extraData={this.getContext().state}
            renderItem={({item, index})=> (
              <TouchableOpacity onPress={()=> this.getContext().removeNewPostHashtag(index)} style={{padding:5}}>
                  <Text style={[HashtagStyle.subTitleStyleHashTag, {color:'#27ae60'}]}>#{item.hashtag}</Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={this.state.searchHashtags}
            extraData={this.state}
            renderItem={({item})=> (
              <TouchableOpacity style={{padding:5}} onPress={()=> this.getContext().addNewPostHashtag(new Hashtag(item.hashtagid, item.categoryid, item.hashtag))}>
                <Text style={[HashtagStyle.subTitleStyleHashTag]}>#{item.hashtag}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    return (
      <View style={GlobalStyle.container}>
      
        <StatusBar backgroundColor="black"/>

        <View style={ToolbarStyle.toolbarStyle}>
          <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-back" size={30} style={ToolbarStyle.toolbarIconColor}/>
          </TouchableOpacity>
          <View style={ToolbarStyle.toolbarContainer}>
            <TextInput
              autoFocus
              underlineColorAndroid="transparent"
              placeholder="ابحث عن تنزيلات"
              style={[TextInputStyle.subContainer, {borderWidth:0, textAlign:'right'}]}
              onChangeText={(keyword) => {this.setState({keyword : keyword}); new HashtagsService(this).get(keyword);}}
              value={this.state.keyword}
            />
            <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>{new PostsService(this.getContext()).getByHashTags(); this.props.navigation.goBack();}}>
              <Ionicons name="md-search" size={30} style={ToolbarStyle.toolbarIconColor}/>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.getContext().getMySearchHashtags()}
          extraData={this.getContext().state}
          renderItem={({item, index})=> (
            <TouchableOpacity onPress={()=> this.getContext().removeMySearchHashtag(index)} style={{padding:5}}>
                <Text style={[HashtagStyle.subTitleStyleHashTag, {color:'#27ae60'}]}>#{item.hashtag}</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={this.state.searchHashtags}
          extraData={this.state}
          renderItem={({item})=> (
            <TouchableOpacity style={{padding:5}} onPress={()=> this.getContext().addMySearchHashtag(new Hashtag(item.hashtagid, item.categoryid, item.hashtag))}>
              <Text style={[HashtagStyle.subTitleStyleHashTag]}>#{item.hashtag}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
