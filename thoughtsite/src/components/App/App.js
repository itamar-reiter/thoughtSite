import React, { useEffect, useState, } from 'react';
import './App.css';
import MainApi from '../../utils/MainApi';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import LoadingPage from '../LoadingPage/LoadingPage';

function App() {

  const navigate = useNavigate();

  const [token, setToken] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const [currentUser, setCurrentUser] = useState({});

  // const [pendingFriendConfirmations, setPendingFriendConfirmations] = useState([]);

  const [friends, setFriends] = useState([]);

  const [displayedPosts, setDisplayedPosts] = useState([]);

  // localStorage.setItem('jwt', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEyZjcyMTkwOWYwNTEzNDYyZWIxY2YiLCJpYXQiOjE2ODI0MjcyNDIsImV4cCI6MTY4MzAzMjA0Mn0.WR8n-6Qriq1g9EcB6g2DNZVJwyalGWwzOPfyECSTmx4");


  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    console.log(token);
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
            navigate('/login');
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      MainApi.getInitialAppInfo(token)
        .then(([userInfo,/*  friends,*/ posts ]) => {
          setCurrentUser(userInfo);
          setFriends(userInfo.friends);
          setDisplayedPosts(posts);
          console.log(userInfo);
          console.log(friends);
          console.log(posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  //login vars and funcs

  const onLogin = (data) => {
    const { email, password } = data;
    return MainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setToken(res.token);;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const loginProps = {
    isLoggedIn,
    onSubmit: onLogin,
  }
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

  const onAddToFollowList = (users) => {
    //add friends to the user's friends object 
    MainApi.handleFriendsList(token, users.map(user => user._id), 'PUT').then((user) => {
      setFriends([...friends, ...user.friends]);
      return user.friends;
    })
      //add the user as a follower to each friend
      .then((friends) => {
        friends.forEach(friend => {
          MainApi.joinToFollowers(token, friend)
            .catch(err => {
              console.log(err);
            });
        })
      })
      .catch(err => console.log(err));
  }

  const onPosting = (input) => {
    MainApi.createPost(input, currentUser._id, token)
      .then(post => {
        setDisplayedPosts([...displayedPosts, post]);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const chooseFriendsProps = {
    searchedUsers,
    onSearch: onChooseFriendsSearch,
    onSubmit: onAddToFollowList,
  }

  const postProps = {

  }

  const feedProps = {
    onSubmit: onPosting,
    posts: displayedPosts,
    postProps,
  }

  const mainProps = {
    friends,
    chooseFriendsProps,
    feedProps,
  }

  const homeProps = {
    loginProps,
    mainProps,
  }

  return (

    <div className='app'>
      <h1> app </h1>
      <Routes>
        <Route path='/home/*' element={<Home homeProps={homeProps} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;