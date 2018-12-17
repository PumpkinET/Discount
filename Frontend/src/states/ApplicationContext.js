import React from 'react';

export default class ApplicationContext extends React.Component{
    getContext() {
        return this.props.screenProps.that;
    }
    getNavigation() {
        return this.props.screenProps.navigation;
    }
}