'use strict';

import React from 'react';
import {View, ScrollView, RefreshControl, StatusBar, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../styles/GlobalStyle';
import PostsService from '../services/PostsService';
import CommercialList from '../cards/CommercialList';
import ApplicationContext from '../states/ApplicationContext';
import ToolbarStyle from '../styles/ToolbarStyle';

export default class HomeScreen extends ApplicationContext {
  state = {gridlistview:false, refreshing:false};
  
  componentDidMount() {
    new PostsService(this.getContext()).getAll();
  }
  
  onRefresh = () => {
    this.setState({refreshing: true});
    new PostsService(this.getContext()).getAll();
    this.setState({refreshing: false});
  }

  render() {
    return ( 
      <View style={GlobalStyle.container}>
        <StatusBar backgroundColor="black"/>
        <View style={ToolbarStyle.toolbarStyle}>
          <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>this.getNavigation().navigate('AddCommercialScreen')}>
              <Ionicons name="md-add" size={30} style={ToolbarStyle.toolbarIconColor}/>
          </TouchableOpacity>
          <TouchableOpacity style={[ToolbarStyle.toolbarIcon]} onPress={ ()=> {this.setState(previousState =>({gridlistview : !previousState.gridlistview})) }}>
          {
              this.state.gridlistview == true && 
              <Ionicons name="md-grid" size={24} style={{color:'black'}} />
          }
          {
              this.state.gridlistview == false &&
              <Ionicons name="md-list" size={24} style={{color:'black'}} />
          }
          </TouchableOpacity>
          <TouchableOpacity style={ToolbarStyle.toolbarContainer} onPress={()=>this.getNavigation().navigate('SearchScreen', {that:this})}>
              <Text style={ToolbarStyle.subToolbarTitle}>ابحث عن تنزيلات</Text>
              <View style={ToolbarStyle.toolbarIcon}>
                {/* <Text style={ToolbarStyle.toolbarTitle}>#فلاير</Text> */}
                <Ionicons name="md-happy" size={30} style={ToolbarStyle.toolbarIconColor}/>
              </View>
          </TouchableOpacity>
        </View>
        <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>
          <CommercialList navigation={this.getNavigation()} state={this.state} posts={this.getContext().getPosts()} gridlistview={this.state.gridlistview}/>
        </ScrollView>
      </View>
    );
  }
}
