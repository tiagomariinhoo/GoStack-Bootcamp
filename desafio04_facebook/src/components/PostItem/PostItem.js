import React from 'react';
import './PostItem.css';
import Persona from '../../assets/persona.png';
import Persona2 from '../../assets/persona2.png';
import Comment from './Comment/Comment';

function PostItem({post}) {
  return(
    <div className = "post-item">
      <div className="profile-content">
        <img src={post.author.avatar} className="persona-img" />
        <div className="name-content">
          <h1 className="profile-name"> {post.author.name} </h1>
          <h1 className="profile-date"> {post.date}</h1>
        </div>
      </div>
      <div post-content className="post-content"> 
        <span> 
          {post.content}
        </span>
      </div>

      <hr/>

      {post.comments.map((comment => (
        <Comment comment={comment}/>
      )))}

    </div>
  );
}

export default PostItem;