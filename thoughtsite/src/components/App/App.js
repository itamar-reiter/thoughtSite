import React, { useEffect, useState} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MainApi from '../../utils/MainApi';

function App() {

  const [token, setToken] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const [currentUser, setCurrentUser] = useState({});

  const [friends, setFriends] = useState([]);

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    if (token) {
      MainApi.checkToken(token)
        .then((res) => {
          if (res) {
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

  const onChooseFriendsSubmit = () => {
    
  }

  const chooseFriendsProps = {
    onSubmit: onChooseFriendsSubmit
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