import React, { useEffect, useState, } from 'react';
import './App.css';
import MainApi from '../../utils/MainApi';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Main from '../Main/Main';
import ChooseFriends from '../ChooseFriends/ChooseFriends';
import Feed from '../Feed/Feed';
import LoadingPage from '../LoadingPage/LoadingPage';

function App() {

  const navigate = useNavigate();

  const [token, setToken] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  // const [pendingFriendConfirmations, setPendingFriendConfirmations] = useState([]);

  const [friends, setFriends] = useState([]);

  const [displayedPosts, setDisplayedPosts] = useState([]);

  const [switchedNavigationButtons, setSwitchedNavigationButtons] = useState({ first: 'login', second: "FaQ's" });

  const [isNavigationHumburgerClicked, setIsNavigationHumburgerClicked] = useState(false);
  
  
  function toggleIsNavigationHumburgerClicked() {
    setIsNavigationHumburgerClicked(!isNavigationHumburgerClicked);
  }

  // localStorage.setItem('jwt', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU4ZDVkZmQ4NDQyMWIyYzQyYWY4ZjAiLCJpYXQiOjE2ODQ4MzYzMDksImV4cCI6MTY4NTQ0MTEwOX0.jCzNI5tIIrmOlslBOGuwAL1TPtm2Y3hoOcIhKnk7IyI");

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    console.log(token);
    if (token) {
      MainApi.checkToken(token)
        .then((res) => {
          if (res) {
            console.log(token);
            setIsLoggedIn(true);
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
        .then(([userInfo,/*  friends,*/ posts]) => {
          setCurrentUser(userInfo);
          setFriends(userInfo.friends);
          setDisplayedPosts(posts);
          setSwitchedNavigationButtons({ first: 'me', second: 'logut' });
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

  const onLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setSwitchedNavigationButtons({ first: 'login', second: "FaQ's" });
    navigate('/');
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
    MainApi.createPost(input, token)
      .then(post => {
        setDisplayedPosts([...displayedPosts, post]);
      })
      .catch(err => {
        console.log(err);
      })
  }



  const switchPostsInDisplayedPosts = (post) => {
    setDisplayedPosts(displayedPosts.map(currentPost =>
      currentPost = currentPost._id === post._id ? post : currentPost));
  }

  const onComment = (input, postId) => {
    console.log('insideOnComment');
    console.log(input, postId);
    MainApi.addComment(input, postId, token)
      .then((post) => {
        console.log(post);
        switchPostsInDisplayedPosts(post);
      })
      .catch(err => console.log(err));
  }

  const onLikeButtonClick = (postId, isLiked) => {
    const method = isLiked ? MainApi.putLike(postId, token) : MainApi.removeLike(postId, token);
    method
      .then((post) => {
        switchPostsInDisplayedPosts(post);
      })
      .catch(err => console.log(err));
  }

  const chooseFriendsProps = {
    searchedUsers,
    onSearch: onChooseFriendsSearch,
    onSubmit: onAddToFollowList,
  }

  const postProps = {
    onSubmit: onComment,
    onLikeButtonClick,

  }

  const headerProps = {
    isLoggedIn,
    currentUser,
    switchedNavigationButtons,
    onHumburgerClick: toggleIsNavigationHumburgerClicked,
    humburgerButtonClicked: isNavigationHumburgerClicked,
  }

  const footerProps = {
    isLoggedIn,
    currentUser,
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
    isLoggedIn,
    headerProps,
    footerProps,
  }

  return (

    <div className='app'>
      <Routes>
        <Route path='/*' element={<Home homeProps={homeProps} />} >
          <Route path='main' element={<Main mainProps={mainProps} />} >
            <Route path='choose-friends' element={<ChooseFriends chooseFriendsProps={chooseFriendsProps} />} />
            <Route path='feed' element={<Feed feedProps={feedProps} />} />
          </Route>
          <Route path='login' element={!isLoggedIn && <Login loginProps={loginProps} />} />

        </Route>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;