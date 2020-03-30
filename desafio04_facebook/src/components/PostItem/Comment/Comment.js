import React from 'react';
import './Comment.css';
import Persona2 from '../../../assets/persona2.png';

function Comment() {
  return (
    <div className="comment-content">
      <img src={Persona2} />
        <span> <b>Tiago Marinho</b> comment comment comment comment comment comment comment
        comment comment comment comment comment comment comment comment comment
        comment comment comment comment comment comment comment comment comment
        comment comment comment comment comment comment comment comment comment
        </span>
    </div>
  );
}

export default Comment;