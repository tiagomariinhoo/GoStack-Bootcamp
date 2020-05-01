import React, { Component } from 'react';

import Header from './Header/Header';
import PostList from './PostList/PostList';

class MainComponent extends Component {
    render() {
        return (
            <>
                <Header/>
                <PostList/>
            </>
        );
    }
}

export default MainComponent;