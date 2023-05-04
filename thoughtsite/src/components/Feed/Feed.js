import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Post from '../Post/Post';
import './Feed.css';


function Feed({ feedProps }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    return values.userPostInput ? feedProps.onSubmit(values.userPostInput) : console.log('no post');
  }
  return (
    <section className='feed'>
      <form className='feed__form' onSubmit={handleSubmit}>
        <input
          className='feed__input'
          required={true}
          minLength={28}
          placeholder={'What do you think of?'}
          name="userPostInput"
          id="userPostInput"
          type="text"
          value={values.userPostInput || ''}
          onChange={handleChange}
          onInput={handleChange}
          onCut={handleChange}
          onPaste={handleChange}
        />
        <span className='feed__post-error'>{errors.userPostInput}</span>
        <button className='feed__submit-button' type='submit'>Post</button>
      </form>
      <ul className='feed__posts'>
        {feedProps.posts && feedProps.posts.map(post => (
          <li key={post._id}>
            <Post post={post} postProps={feedProps.postProps} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Feed;