import React from 'react';
import {FlatList} from 'react-native';
import CommercialCard from './CommercialCard';

export default class CommercialList extends React.Component {

    renderItem = ({item}) => (
        <CommercialCard 
            author={item.author} 
            location={item.location} 
            avatar={item.avatar} 
            status={item.status}
            description={item.description}
            images={item.images}
            hashtags={item.hashtags}
            phone={item.phone}
            navigation={this.props.navigation}
            gridlistview={this.props.gridlistview}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.posts}
                extraData={this.props.state}
                renderItem={this.renderItem}
            />
        );
    }
}
