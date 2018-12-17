import React from 'react';
import Hashtag from '../models/Hashtag';

export default class GlobalStates extends React.Component{
    state = { 

        username:'sakal',  
        password:'123',
        unauthorizedUse:false,
        
        posts:[],

        mySearchHashtags:[],
        newPostHashtags:[],


    };

    setUsername(username) {
        this.setState({username:username});
    }
    getUsername() {
        return this.state.username;
    }

    setPassword(password) {
        this.setState({password:password});
    }
    getPassword() {
        return this.state.password;
    }

    setUnauthorized(unauthorizedUse) {
        this.setState({unauthorizedUse:unauthorizedUse});
    }
    getUnauthorized() {
        return this.state.unauthorizedUse;
    }

    setPosts(posts) {
        this.setState({posts:posts});
    }
    getPosts() {
        return this.state.posts;
    }
    
    //my selected hash tags for search
    addMySearchHashtag(hashtag) {
        mySearchHashtags = this.state.mySearchHashtags;
        mySearchHashtags.push(hashtag);
        this.setState({mySearchHashtags:mySearchHashtags});
    }
    removeMySearchHashtag(index) {
        mySearchHashtags = this.state.mySearchHashtags;
        mySearchHashtags.splice(index, 1);
        this.setState({mySearchHashtags:mySearchHashtags});
    }
    getMySearchHashtags() {
        return this.state.mySearchHashtags;
    }

    //my selected hash tags for new post
    addNewPostHashtag(hashtag) {
        newPostHashtags = this.state.newPostHashtags;
        newPostHashtags.push(hashtag);
        this.setState({newPostHashtags:newPostHashtags});
    }
    removeNewPostHashtag(index) {
        newPostHashtags = this.state.newPostHashtags;
        newPostHashtags.splice(index, 1);
        this.setState({newPostHashtags:newPostHashtags});
    }
    getNewPostHashtags() {
        return this.state.newPostHashtags;
    }

}