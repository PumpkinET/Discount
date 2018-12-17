import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity, Modal} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CommercialCardStyle from '../styles/CommercialCardStyle';
import RatioImageWidget from '../widgets/RatioImageWidget';
import GridStyle from '../styles/GridStyle';
import GlobalStyle from '../styles/GlobalStyle';

export default class CommercialCard extends React.Component {
    state = { modalVisible: false, targetUri:null};
    
    setModalVisible(visible, uri) {
        this.setState({modalVisible: visible});
        this.setState({targetUri: uri});
    }

    render() {
        return (
            <View style={CommercialCardStyle.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(!this.state.modalVisible);}}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <View>
                            <RatioImageWidget uri={this.state.targetUri} margin="0" full/>
                        </View> 
                        <TouchableOpacity style={[CommercialCardStyle.cardActionButton, {position:'absolute', top:0, right:0}]} onPress={() => { this.setModalVisible(!this.state.modalVisible);}}>
                            <Text style={CommercialCardStyle.modalTitle}>أغلق</Text>
                            <Ionicons name="md-close" size={35} style={{color:'black'}}/> 
                        </TouchableOpacity> 
                        <TouchableOpacity style={[CommercialCardStyle.cardActionButton, {position:'absolute', bottom:0, right:0}]}>
                            <Text style={CommercialCardStyle.modalTitle}>مشاركه</Text>
                            <Ionicons name="md-share" size={30} style={{color:'black'}}/> 
                        </TouchableOpacity> 
                    </View>
                </Modal>
                
                <TouchableOpacity style={CommercialCardStyle.cardBlock} onPress={()=>this.props.navigation.navigate('ProfileScreen', {
                    targetAuthor:this.props.author,
                    targetAvatar:this.props.avatar,
                    targetPhone:this.props.phone,
                    targetLocation:this.props.location,
                    targetStatus:this.props.status,
                })}>
                    <View>
                        <Text style={CommercialCardStyle.titleStyle}>{this.props.author}</Text>
                        <Text style={[CommercialCardStyle.subTitleStyle, {color:"#95a5a6"}]}>{this.props.location}</Text>
                    </View>
                    <Image source={{uri: this.props.avatar}} style={[CommercialCardStyle.avatar]}  />
                </TouchableOpacity>

                <View style={CommercialCardStyle.cardBlock}>
                    <Text style={[CommercialCardStyle.subTitleStyle]}>{this.props.description}</Text>
                </View>
                
                {
                    this.props.gridlistview == true && 
                    <FlatList
                        showsHorizontalScrollIndicator={false}  
                        horizontal
                        inverted="-1" 
                        data={this.props.images}
                        renderItem={({index}) => (
                            <TouchableOpacity style={[CommercialCardStyle.centerColumn]} onPress={() => { this.setModalVisible(true, this.props.images[index].content); }}>
                                <RatioImageWidget uri={this.props.images[index].content} margin="0" />
                                <Text style={CommercialCardStyle.subTitleStyle}>{this.props.images[index].idescription}</Text>
                            </TouchableOpacity>
                        )}
                    />
                }
                {
                    this.props.gridlistview == false && 
                    <FlatList
                        style={{alignItems:'flex-end'}}
                        data={this.props.images}
                        renderItem={({index}) => (
                            <TouchableOpacity style={GridStyle.profilePostStyle} onPress={() => { this.setModalVisible(true, this.props.images[index].content); }}>
                                <Image resizeMethod="resize" resizeMode="cover" source={{uri: this.props.images[index].content, cache: 'reload'}} style={GridStyle.profilePostImageStyle}/>
                            </TouchableOpacity>
                        )}
                        numColumns="3"
                    />
                }

                <View style={CommercialCardStyle.cardAction}>
                    <TouchableOpacity style={CommercialCardStyle.cardActionButton}>
                        <Text style={CommercialCardStyle.cardActionTitle}>مشاركه</Text>
                        <Ionicons name="md-share" size={24} style={GlobalStyle.greyIcon}/> 
                    </TouchableOpacity> 
                </View>

                <View style={[CommercialCardStyle.centerRow]}>
                {
                    this.props.hashtags.map((item) => (
                        <TouchableOpacity>
                            <Text style={[CommercialCardStyle.subTitleStyleHashTag]}>
                                #{item.hashtag} 
                            </Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
            </View>
        )
    }
}
