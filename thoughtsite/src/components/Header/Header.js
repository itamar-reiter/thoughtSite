import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({headerProps}) {
  return (
    <header className='header'>
      <h1 className='header__logo'>ThoughtSite</h1>
      <Navigation navigationProps={headerProps}/>
      <div className='mobile-navigator' onClick={headerProps.onHumburgerClick}>
        <div className='mobile-navigator__line'/>
        <div className='mobile-navigator__line'/>
        <div className='mobile-navigator__line'/>
      </div>
    </header>
  )
}

export default Header