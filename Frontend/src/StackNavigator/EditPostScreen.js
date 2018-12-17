import React from 'react';
import {View} from 'react-native';
import CommercialCard from '../cards/CommercialCard';
import GlobalStyle from '../styles/GlobalStyle';

export default class EditPostScreen extends React.Component {
  render() {
    item = this.props.navigation.getParam('targetPost');
    return (
      <View style={GlobalStyle.container}>
        {/* <ToolbarWidget screen="تصحيح المنشور" pop={this.props.navigation} type="pop"/> */}
        <CommercialCard 
          author={item.author} 
          location={item.location} 
          avatar={item.avatar} 
          description={item.description}
          hashtags={item.hashtags}
          images={item.images}
          phone={item.phone}
          gridlistview={true}
        />
      </View>
    );
  }
}