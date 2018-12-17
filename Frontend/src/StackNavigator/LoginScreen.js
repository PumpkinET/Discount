import React from 'react';
import {View, TouchableOpacity, TextInput, Text, StatusBar} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import AuthorsService from '../services/AuthorsService';
import ApplicationContext from '../states/ApplicationContext';
import FormStyle from '../styles/FormStyle';
import ToolbarStyle from '../styles/ToolbarStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class LoginScreen extends ApplicationContext {
  login() {
    new AuthorsService(this).login(this.getContext().getUsername(), this.getContext().getPassword());
  }
  render() {
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
          <View style={FormStyle.titleContainer}>
            <Text style={FormStyle.title}>
            #فلاير
            </Text>
          </View>
          <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{width:'90%', justifyContent:'center', alignItems:'flex-end'}}>
              <Text style={{margin:5}}>
                اسم المستخدم
              </Text>
            </View>
            <TextInput
              style={FormStyle.textInputContainer}   
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.getContext().setUsername(text)}
              value={this.getContext().getUsername()}
            />
          </View>
          <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{width:'90%', justifyContent:'center', alignItems:'flex-end'}}>
              <Text style={{margin:5}}>
                كلمه السر
              </Text>
            </View>
            <TextInput
              style={FormStyle.textInputContainer}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.getContext().setPassword(text)}
              value={this.getContext().getPassword()}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={FormStyle.container} onPress={()=>this.login()}>
            <Text style={{color:'white'}}>دخول</Text>
          </TouchableOpacity>

          <TouchableOpacity style={FormStyle.transparentContainer} onPress={()=>this.props.navigation.navigate("RegisterScreen")}>
            <Text style={{color:'black'}}>مستخدم جديد</Text>
          </TouchableOpacity>

          <TouchableOpacity style={FormStyle.transparentContainer} onPress={() => {
              this.getContext().setUnauthorized(true)
              this.props.navigation.navigate("TabNavigator")
            }}>
            <Text style={{color:'black'}}>الاستعمال بدون مستخدم</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}