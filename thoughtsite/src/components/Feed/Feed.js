import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Post from '../Post/Post';
import './Feed.css';
import { TextField, Button, CssBaseline, Paper } from '@mui/material';


function Feed({ feedProps }) {
  const { values, valuesLength, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    return values.userPostInput ? feedProps.onSubmit(values.userPostInput) : console.log('no post');
  }
  return (
    <section className='feed'>
      <Paper elevation={3} sx={{ p: '10px' }}>
        <form className='feed__form' onSubmit={handleSubmit}>
          <TextField
            required={true}
            placeholder={'What do you think of?'}
            name="userPostInput"
            id="userPostInput"
            type="text"
            value={values.userPostInput || ''}
            onChange={handleChange}
            color={errors.userPostInput ? 'error' : 'primary'}
            inputProps={{ minLength: 28 }}
            size='small'
            sx={{ w: '100%' }}
          />
          {valuesLength.userPostInput < 28 ? <span className='feed__post-counter'>{valuesLength.userPostInput}/28</span> : <CssBaseline />}
          <Button type='submit' variant='contained' disabled={!isValid}>Post</Button>
        </form>
        <ul className='feed__posts'>
          {feedProps.posts && feedProps.posts.map(post => (
            <li key={post._id}>
              <Post post={post} postProps={feedProps.postProps} />
            </li>
          ))}
        </ul>
      </Paper>
    </section>
  )
}

export default Feed;