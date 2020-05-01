import React from 'react';
import './Comment.css';
import Persona2 from '../../../assets/persona2.png';

function Comment({comment}) {
  return (
    <div className="comment-content">
      <img src={comment.author.avatar} />
        <span> <b>{comment.author.name}</b> {comment.content}
        </span>
    </div>
  );
}

export default Comment;