import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';

export default class RatioImageWidget extends Component {
    state = {width:null, height:null, resizeMode:'contain'};

    componentDidMount() {
        Image.getSize(this.props.uri, (srcWidth, srcHeight) => {
            
        maxHeight = Dimensions.get('window').height;
        const maxWidth = Dimensions.get('window').width;

        // if(srcWidth/srcHeight <= 0.5) { 
        //     maxWidth = 500;
        //     maxHeight = 1000;
        // } else {
        //     maxWidth = 500; 
        //     maxHeight= 500; ,
        // }
        //maxHeight *= 0.7; 
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        if(this.props.full==null) ratio *= 0.5;
        if(this.props.height) {
            this.setState({ width: srcWidth * ratio, height: this.props.height });
        } else {
            this.setState({ width: srcWidth * ratio , height: srcHeight * ratio  });
        }
        this.setState({resizeMode:this.props.resizeMode});
        }, error => {
            console.log('error:', error);
        });
    }

    render() {
        return (
            <Image resizeMethod="resize" resizeMode={this.state.resizeMode} source={{uri: this.props.uri, cache: 'reload'}} style={{width: this.state.width-this.props.margin, height: this.state.height-this.props.margin}} />
        );
    }
}
