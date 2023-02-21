import React, {useState} from 'react'
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  const [friends, setFriends] = useState([]);
  const mainProps = {
    friends
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