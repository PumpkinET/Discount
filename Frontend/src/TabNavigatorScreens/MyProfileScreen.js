import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, ScrollView, AsyncStorage, StatusBar} from 'react-native';
import GridStyle from '../styles/GridStyle';
import GlobalStyle from '../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommercialCardStyle from '../styles/CommercialCardStyle';
import PostsService from '../services/PostsService';
import ToolbarStyle from '../styles/ToolbarStyle';
import ApplicationContext from '../states/ApplicationContext';
import FormStyle from '../styles/FormStyle';

export default class ProfileScreen extends ApplicationContext {
  state = { posts:[]};

  componentDidMount() {
    AsyncStorage.getItem("author").then((goals) => {
      let me = JSON.parse(goals);
      new PostsService(this).get(me.author);
    }).catch((error) => {
      console.log('Promise is rejected with error: ' + error);
    });
  }
  render() {
    if(this.getContext().getUnauthorized() == true) {
      return (
        <View style={[GlobalStyle.container]}>
          <StatusBar backgroundColor="black"/>
          <View style={ToolbarStyle.toolbarStyle}>
            <View style={ToolbarStyle.toolbarContainer}>
              <Text style={ToolbarStyle.toolbarTitle}>تسجيل الدخول</Text>
              <TouchableOpacity style={ToolbarStyle.toolbarIcon}>
                  <Ionicons name="md-happy" size={30} style={ToolbarStyle.toolbarIconColor}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <TouchableOpacity style={FormStyle.container} onPress={()=>this.props.screenProps.navigation.navigate("LoginScreen")}>
              <Text style={{color:'white'}}>دخول</Text>
            </TouchableOpacity>

            <TouchableOpacity style={FormStyle.container} onPress={()=>this.props.screenProps.navigation.navigate("RegisterScreen")}>
              <Text style={{color:'white'}}>مستخدم جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={GlobalStyle.container}>
        <StatusBar backgroundColor="black"/>
        <View style={ToolbarStyle.toolbarStyle}>
          <View style={ToolbarStyle.toolbarContainer}>
            <Text style={ToolbarStyle.toolbarTitle}>زاويتي الخاصه</Text>
            <TouchableOpacity style={ToolbarStyle.toolbarIcon}>
                <Ionicons name="md-happy" size={30} style={ToolbarStyle.toolbarIconColor}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <FlatList
            data={this.state.posts}
            extraData={this.state}
            renderItem={({item, index}) => (
            <View>
              {
                index == 0 && 
                <View>
                  <View style={CommercialCardStyle.cardBlock}>
                  <Text style={CommercialCardStyle.titleStyle}>{item.author}</Text>
                  <Image resizeMethod="resize" source={{uri: item.avatar}} style={[CommercialCardStyle.avatar]}  />
                  </View>
                  <View style={[CommercialCardStyle.centerColumn, {alignItems:'flex-end'}]}>
                    <TouchableOpacity style={[CommercialCardStyle.centerRow, CommercialCardStyle.shadow, {margin:5}]}>
                      <Text style={CommercialCardStyle.subTitleStyle}>{item.phone}</Text>
                      <Ionicons name="md-call" size={24} style={{color:'#27ae60'}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[CommercialCardStyle.centerRow, CommercialCardStyle.shadow, {margin:5}]}>
                      <Text style={CommercialCardStyle.subTitleStyle}>{item.location}</Text>
                      <Ionicons name="md-navigate" size={24} style={{color:'#2980b9'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[CommercialCardStyle.centerRow, CommercialCardStyle.shadow, {margin:5}]}>
                      <Text style={[CommercialCardStyle.subTitleStyle]}>{item.status}</Text>
                      <Ionicons name="md-information-circle" size={24} style={{color:'#c0392b'}}/>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              <FlatList
                style={{borderTopWidth:2, borderTopColor:'#ecf0f1', alignItems:'flex-end'}}
                data={item.images}
                renderItem={({index}) => (
                  <TouchableOpacity style={GridStyle.profilePostStyle} onPress={()=>this.props.screenProps.navigation.navigate('PostScreen', {
                    targetPost:item,
                    index:index
                  })}>
                    <Image resizeMethod="resize" resizeMode="cover" source={{uri: item.images[index].content}} style={GridStyle.profilePostImageStyle}/>
                  </TouchableOpacity>
                )}
                numColumns="3"
              />
            </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
