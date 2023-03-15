import React from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className='navigation'>
      <Link to='/' className='navigation__link'>Home</Link>
      <Link to='/search' className='navigation__link'>search</Link>
      <Link to='/freinds' className='navigation__link'>friends</Link>
      <Link to='/login' className='navigation__link'>log in</Link>
      {/* <button className='navigation__button'>log out</button>
      <button className='navigation__button'>log out</button>
      <button className='navigation__button'>log out</button>
      <button className='navigation__button'>log out</button> */}
    </nav>
  )
}

export default Navigation