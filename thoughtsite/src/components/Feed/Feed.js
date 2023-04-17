import React from 'react';
import Post from '../Post/Post';
import './Feed.css';

function Feed(feedProps) {
  return (
    <section className='feed'>
      <input 
      className='feed__input' 
      required={true}
      minLength={280}
      placeholder={'What do you think of?'}
      type="text"
      name="user-post-input"
      id="userPostInput"
      onChange={feedProps.onSubmit}
      />
      <ul>
        {
          feedProps.posts.map(post => {
            <li>
            <Post postProps = {post} />
            </li>
          })
        }
      </ul>
    </section>
  )
}

export default Feed;