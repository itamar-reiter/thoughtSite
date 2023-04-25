import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChooseFriends from '../ChooseFriends/ChooseFriends';
import Feed from '../Feed/Feed';
import MoreInfo from '../MoreInfo/MoreInfo';
import Settings from '../Settings/Settings';
import './Main.css';

function Main({ mainProps }) {
  return (
    <main className='main'>
      <Settings />
      <Routes>
        <Route path='choose-friends/*' element={
          <ChooseFriends chooseFriendsProps={mainProps.chooseFriendsProps} />
        } />
        <Route path='feed/*' element={
          <Feed feedProps={mainProps.feedProps} />
        } />
      </Routes>
      <MoreInfo />
    </main>
  )
}

export default Main