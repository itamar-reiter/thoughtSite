import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <h1 className='header__logo'>Thought Site</h1>
      <Navigation/>
    </header>
  )
}

export default Header