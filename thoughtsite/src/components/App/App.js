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

  const [posts, setPosts] = useState([]);

  // localStorage.setItem('jwt', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjN2IwYzI4YTJiZGE3ODliMTM1MzUiLCJpYXQiOjE2Nzg4ODIzMjIsImV4cCI6MTY3OTQ4NzEyMn0.DjKs-nxEFvrE7cSy0I1oH15KFWWcSzIyz-s_QaQxasY");


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
        .then(([userInfo,/*  friends, posts */]) => {
          setCurrentUser(userInfo);
          /* setFriends(friends);
          setPosts(posts); */
          console.log(userInfo);
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
    // users.forEach((user) => {
    // console.log(user);
    MainApi.addFriends(token, users.map(user => user._id)).then((requestedFriends) => {
      setFriends(...friends, requestedFriends);
      console.log(friends);
    })
    // })
  }

  const chooseFriendsProps = {
    searchedUsers,
    onSearch: onChooseFriendsSearch,
    onSubmit: onAddToFollowList,
  }


  const mainProps = {
    friends: friends,
    chooseFriendsProps,
  }

  const homeProps = {
    loginProps: loginProps,
    mainProps: mainProps,
  }
  return (

    <div className='app'>
      <Routes>
        <Route path='/' element={<Home homeProps={homeProps} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;