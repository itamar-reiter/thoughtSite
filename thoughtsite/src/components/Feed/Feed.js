import React from 'react';
import Post from '../Post/Post';
import './Feed.css';

function Feed() {
  return (
    <section className='feed'>
      <ul>
        <Post />
        
      </ul>
    </section>
  )
}

export default Feed;