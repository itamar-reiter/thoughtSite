import React, { useState } from 'react';
import './ChooseFriends.css';

function ChooseFriends({ chooseFriendsProps }) {

  const [user, setUser] = useState('');

  function onUserChange(e) {
    setUser(e.target.value);
  }

  const handleSubmit = () => {
    chooseFriendsProps.onSubmit(user);
  }

  return (
    <section className='choose-friends'>
      <form onSubmit={handleSubmit}>
        <label className='choose-friends__label'> type a name:</label>
        <input
          className='choose-friends_input'
          type="text"
          name="user"
          id="searchUserInput"
          onChange={onUserChange}
          placeholder='For example: "David"'
          minLength={2}
          maxLength={25}
          required={true}
        />
        <button
          className='choose-friends__submit-button'
          type='submit'>search</button>
      </form>
    </section>
  )
}

export default ChooseFriends