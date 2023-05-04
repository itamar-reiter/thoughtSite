import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Comment from '../Comment/Comment';
import './Post.css';

function Post({ post, postProps }) {

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const handleCommentSubmit = (evt) => {
    evt.preventDefault();
    postProps.onSubmit(values.comment, post._id);
    console.log(values.comment);
    console.log(post._id);
  }

  const handleLikeButtonClick = (evt) => {
    evt.preventDefault();
    postProps.onLikeButtonClick(post._id, post.isLiked);
  }

  return (
    <div className='post'>
      <div className='post__author-details'>
        <span className='post__author-name'>{post.owner}</span>
        {/* <img className='post__author-image' src={postProps.owner} alt='author phot-o'/> */}
      </div>
      <p className='post__content'>{post.text}</p>
      <button className={`post__like-button ${post.isLiked ? 'post__like-button_active' : ''}`}
        onClick={handleLikeButtonClick} />
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
            <li key={comment._id}>
              <Comment commentProps={comment} />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Post;