import React, { useState } from 'react';
import './ChooseFriends.css';

function ChooseFriends({ chooseFriendsProps }) {

  const [user, setUser] = useState('');
  const [awaitingFriends, setAwaitingFriends] = useState([]);


  function onUserChange(e) {
    setUser(e.target.value);
  }

  function onChosenUserClick(e, user) {
    if (e.target.style.color !== 'red') {
      setAwaitingFriends([...awaitingFriends, user]);
      e.target.style.color = 'red';
    }
    else {
      setAwaitingFriends(awaitingFriends.filter(currentUser => {
        return currentUser !== user;
      }))
      e.target.style.color = 'black';
    }
  }

  function onAwaitingUserClick(e, user) {
    setAwaitingFriends(awaitingFriends.filter(currentUser => {
      return currentUser !== user;
    }))
    console.log(awaitingFriends.length);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    chooseFriendsProps.onSearch(user);
  }

  const handleAddToFollow = (e) => {
    e.preventDefault();
    chooseFriendsProps.onSubmit(awaitingFriends);
  }

  /* const handleSave = (e) => {
  } */

  return (
    <section className='choose-friends'>
      <form onSubmit={handleSearch}>
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
          type='submit'>search peoples</button>
      </form>
      <ul className='choose-friends__searched-list'>
        {chooseFriendsProps.searchedUsers.length !== 0 && chooseFriendsProps.searchedUsers.map((user) => {
          return <li key={user._id} className='choose-friends__item_type_search'
            onClick={(e) => onChosenUserClick(e, user)}>{user.name}</li>
        })}
      </ul>
      <ul className='choose-friends__awaiting-list'>
        {awaitingFriends.length !== 0 && awaitingFriends.map((user) => {
          return <li key={user._id} className='choose-friends__item_type_await'
          onClick={(e) => onAwaitingUserClick(e, user)}>{user.name}</li>
        })}
      </ul>
      <button type='button' onClick={handleAddToFollow}>follow</button>
      <br></br>
      {/* <button type="button"
      onClick={(e) => {handleSave(e)}}>save</button> */}
    </section>
  )
}

export default ChooseFriends;