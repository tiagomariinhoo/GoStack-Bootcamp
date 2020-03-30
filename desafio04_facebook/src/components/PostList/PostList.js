import React from 'react';
import './PostList.css';

import PostItem from '../PostItem/PostItem';

function PostList() {
  return (
    <div className="postlist-div">
      <PostItem></PostItem>
      <PostItem></PostItem>
      <PostItem></PostItem>
      <PostItem></PostItem>
    </div>
  );
}

export default PostList;