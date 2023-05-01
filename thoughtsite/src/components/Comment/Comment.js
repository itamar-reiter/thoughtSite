import React from 'react';
import './Comment.css';

function Comment({ commentProps }) {
  return (
    <div className='comment'>
    <span className='comment__owner'>Comment Writen By - {commentProps.owner}</span>
    <p className='comment__text'>Comment Text - {commentProps.text}</p>
    </div>
  )
}

export default Comment;