import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Comment from '../Comment/Comment';
import './Post.css';

function Post({ post, onSubmit }) {

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const handleCommentSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values.comment, post._id);
    console.log(values.comment);
    console.log(post._id);
  }
  return (
    <div className='post'>
      <div className='post__author-details'>
        <span className='post__author-name'>{post.owner}</span>
        {/* <img className='post__author-image' src={postProps.owner} alt='author phot-o'/> */}
      </div>
      <p className='post__content'>{post.text}</p>
      <div className='comments'>
        <form className='comments__form' onSubmit={handleCommentSubmit}>
          <input
            className='comments__input'
            required={true}
            name="comment"
            id="comment"
            placeholder='write a comment'
            type="text"
            value={values.comment || ''}
            onChange={handleChange}
            onInput={handleChange}
            onCut={handleChange}
            onPaste={handleChange}
          />
          <button className='comments__button'>comment</button>
          <span className='comments__error'>{errors.comment}</span>
        </form>
        <ul className='comments__list'>
          {post.comments.map(comment =>
            <li>
              <Comment commentProps={comment} />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Post;