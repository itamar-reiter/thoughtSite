import React from 'react';
import './Post.css';

function Post(postProps) {
  return (
    <div className='post'>
      <div className='post__author-details'>
        <span className='post__author-name'>{postProps.name}</span>
        <img className='post__author-image' src={postProps.name} alt='author phot-o'/>
      </div>
      <p className='post__content'>{postProps.post}</p>
    </div>
  )
}

export default Post