import React from 'react';
import {View, ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import CommercialList from '../cards/CommercialList';
import ToolbarStyle from '../styles/ToolbarStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class PostScreen extends React.Component {
  state = {gridlistview:false, posts:[]}

  componentDidMount() {
    posts = this.state.posts;
    posts.push(this.props.navigation.getParam('targetPost'));
    this.setState({posts:posts});
  }
  render() {  
    return (
      <View style={GlobalStyle.container}>
        <StatusBar backgroundColor="black"/>
        <View style={ToolbarStyle.toolbarStyle}>
          <TouchableOpacity style={ToolbarStyle.toolbarIcon} onPress={()=>this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={30} style={ToolbarStyle.toolbarIconColor}/>
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
          <View style={ToolbarStyle.toolbarContainer}>
            <Text style={ToolbarStyle.toolbarTitle}>الزاويه الخاصه</Text>
            <TouchableOpacity style={ToolbarStyle.toolbarIcon}>
                <Ionicons name="md-happy" size={30} style={ToolbarStyle.toolbarIconColor}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <CommercialList state={this.state} posts={this.state.posts} gridlistview={this.state.gridlistview}/>
        </ScrollView>
      </View>
    );
  }
}