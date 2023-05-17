import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import ChooseFriends from '../ChooseFriends/ChooseFriends';
import Feed from '../Feed/Feed';
import MoreInfo from '../MoreInfo/MoreInfo';
import Settings from '../Settings/Settings';
import './Main.css';

function Main({ mainProps }) {
  return (
    <main className='main'>
      <Settings />
        <nav className="main__nav">
        <Link to="/home/main/choose-friends">choose-friends</Link>
        <Link to="/home/main/feed">feed</Link>
      </nav>
      <Outlet />
      <MoreInfo />
    </main>
  )
}

export default Main