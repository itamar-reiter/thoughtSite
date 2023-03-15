import React from 'react';
import { Link } from "react-router-dom";
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Login({loginProps}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginProps.onSubmit(values);
  }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
      <input className='login__input'
        placeholder='email'
        minLength={2}
        maxLength={25}
        type='email'
        name='email'
        id='loginEmail'
        value={values.email || ''}
        onInput={handleChange}
        onCut={handleChange}
        onPaste={handleChange}
        required={true}
      />
      <span hidden={!errors.email}>{errors.email}</span>
      <input className='login__input'
        placeholder='password'
        minLength={2}
        maxLength={25}
        type='text'
        name='password'
        id='loginPassword'
        value={values.password || ''}
        onInput={handleChange}
        onCut={handleChange}
        onPaste={handleChange}
        required={true}
      />
      <span className='login__input-error' hidden={!errors.password}>{errors.password}</span>
      <button type="submit" disabled={!isValid}>Login</button>
      </form>
      <Link to={'/signup'}>or signup</Link>
    </div>
  )
}

export default Login;