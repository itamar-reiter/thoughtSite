import React from 'react';
import ChooseFriends from '../ChooseFriends/ChooseFriends';
import Feed from '../Feed/Feed';
import MoreInfo from '../MoreInfo/MoreInfo';
import Settings from '../Settings/Settings';
import './Main.css';

function Main({ mainProps }) {
  return (
    <main className='main'>
      {mainProps.freinds = [] ?
        <ChooseFriends />
        : <>
          <Settings />
          <Feed />
          <MoreInfo />
        </>}
    </main>
  )
}

export default Main