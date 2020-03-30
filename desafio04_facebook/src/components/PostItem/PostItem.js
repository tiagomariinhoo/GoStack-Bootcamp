import React from 'react';
import './PostItem.css';
import Persona from '../../assets/persona.png';
import Persona2 from '../../assets/persona2.png';
import Comment from './Comment/Comment';

function PostItem() {
  return(
    <div className = "post-item">
      <div className="profile-content">
        <img src={Persona} className="persona-img" />
        <div className="name-content">
          <h1 className="profile-name"> Tiago Marinho </h1>
          <h1 className="profile-date"> 23 Jun 2020</h1>
        </div>
      </div>
      <div post-content className="post-content"> 
        <span> Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        </span>
      </div>

      <hr/>

      <Comment/>
      <Comment/>

    </div>
  );
}

export default PostItem;