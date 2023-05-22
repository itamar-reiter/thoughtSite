import React, { useState } from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";

function Navigation({ navigationProps }) {

  

  return (
    <nav className={`navigation navigation_type`}>
      <div className='navigation__links'>
        <Link to='/' className='navigation__link'>Home</Link>
        <Link to='/search' className='navigation__link'>search</Link>
        <Link to='/friends' className='navigation__link'>friends</Link>
        <Link to='/notfications' className='navigation__link'>notfications</Link>
      </div>
      <div className='navigation__buttons'>
      <Link to={`/${navigationProps.switchedNavigationButtons.first}`} className='navigation__button navigation__button_number_0'>{navigationProps.switchedNavigationButtons.first}</Link>
        <Link to={`/${navigationProps.switchedNavigationButtons.second}`} className='navigation__button navigation__button_number_1'>{navigationProps.switchedNavigationButtons.second}</Link>
      </div>
    </nav>
  )
}

export default Navigation