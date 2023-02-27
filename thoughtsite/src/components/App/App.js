import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MainApi from '../../utils/MainApi';

function App() {

  const [token, setToken] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const [currentUser, setCurrentUser] = useState({});

  const [pendingFriendConfirmations, setPendingFriendConfirmations] = useState([]);

  const [friends, setFriends] = useState([]);

  const [posts, setPosts] = useState([]);

// localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjN2IwYzI4YTJiZGE3ODliMTM1MzUiLCJpYXQiOjE2Nzc0OTEwMjcsImV4cCI6MTY3ODA5NTgyN30.B_gTT-l_x4R-TGx__HflVrylL8I3vj2dDLa4aXVFRsw");
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    if (token) {
      MainApi.checkToken(token)
        .then((res) => {
          if (res) {
            console.log(token);
            setIsLoggedIn(true);
            console.log(true);
          }
          else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      MainApi.getInitialAppInfo(token)
        .then(([userInfo, friends, posts]) => {
          setCurrentUser(userInfo);
          setFriends(friends);
          setPosts(posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  //choose friends vars anf funcs

  const [searchedUsers, setSearchedUsers] = useState([]);


  const onChooseFriendsSearch = (name) => {
    return MainApi.getUsers(token, name)
      .then(users => {
        setSearchedUsers(users);
        console.log(users);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onAddToWaitingRoom = (users) => {
    users.forEach((user) => {
      console.log(user);
      MainApi.joinWaitingRoom(token, user._id).then((requestedFriends) => {
        setPendingFriendConfirmations(requestedFriends);
        console.log(pendingFriendConfirmations);
      })
    })
  }

  const chooseFriendsProps = {
    searchedUsers,
    onSearch: onChooseFriendsSearch,
    onSubmit: onAddToWaitingRoom,
  }

  const mainProps = {
    friends: friends,
    chooseFriendsProps,
  }
  return (

    <div className='app'>
      <Header />
      <Main
        mainProps={mainProps} />
      <Footer />
    </div>
  )
}

export default App;