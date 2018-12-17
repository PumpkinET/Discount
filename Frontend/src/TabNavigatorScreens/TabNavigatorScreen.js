import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import MyProfileScreen from './MyProfileScreen';
import ProfileScreen from '../StackNavigator/ProfileScreen'
import PostScreen from '../StackNavigator/PostScreen';
import EditPostScreen from '../StackNavigator/EditPostScreen';
import LoginScreen from '../StackNavigator/LoginScreen';
import RegisterScreen from '../StackNavigator/RegisterScreen';
import AddCommercialScreen from '../StackNavigator/AddCommercialScreen';
import SearchScreen from '../StackNavigator/SearchScreen';
import GalleryScreen from '../StackNavigator/GalleryScreen';
import ApplicationContext from '../states/ApplicationContext';

let routeConfigs = {   
    MyProfileScreen: {
        screen: MyProfileScreen,
    },
    HomeScreen: {
        screen: HomeScreen,
    },
}; 

let tabNavigatorConfig = {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'HomeScreen') {
                iconName = "md-home";
            }
            else if (routeName === 'MyProfileScreen') {
                iconName = "md-person";
            }
            return <Ionicons name={iconName} size={24} style={{color:tintColor}} />;
        },
    }),
    tabBarVisbile:false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: '#95a5a6',
        showIcon : true,
        showLabel : false,
        style: {
            backgroundColor: 'white',
            padding:0, 
            margin:0,
            borderWidth:0,
            borderColor:'white',
            color:'white'
        },
        indicatorStyle: {
            opacity: 0
        },
    },
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName :'HomeScreen'
};

const TabNavigatorScreen = createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);

class TabNavigator extends ApplicationContext {
    componentDidMount() {
        console.log("TabNavigator " + this.getContext().getUsername());
    }
    render() {
      return (
          <TabNavigatorScreen screenProps={{that:this.getContext(), navigation:this.props.navigation}}/>
      );
    }
}
  
export default StackNavigator = createStackNavigator(
    {
        TabNavigator,
        GalleryScreen,
        ProfileScreen,
        PostScreen,
        AddCommercialScreen,
        SearchScreen,
        EditPostScreen,
        LoginScreen,
        RegisterScreen,
    },
    {
      initialRouteName: 'LoginScreen',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
    }
)