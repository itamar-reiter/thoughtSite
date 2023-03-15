import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Signup({SignupProps}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    SignupProps.onSubmit(values);
  }
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
      <input className='signup__input'
        placeholder='email'
        minLength={2}
        maxLength={25}
        type='email'
        name='email'
        id='signupEmail'
        value={values.email || ''}
        onInput={handleChange}
        onCut={handleChange}
        onPaste={handleChange}
        required={true}
      />
      <span hidden={!errors.email}>{errors.email}</span>
      <input className='signup__input'
        placeholder='password'
        minLength={2}
        maxLength={25}
        type='text'
        name='password'
        id='signupPassword'
        value={values.password || ''}
        onInput={handleChange}
        onCut={handleChange}
        onPaste={handleChange}
        required={true}
      />
      <span className='signup__input-error' hidden={!errors.password}>{errors.password}</span>
      <button type="submit" disabled={!isValid}>signup</button>
      {/* <button type="button" onClick={() => resetForm()}>Reset</button> */}
      </form>
    </div>
  )
}

export default Signup;