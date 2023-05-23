import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Routes, Link, Outlet } from 'react-router-dom';

function Home({ homeProps }) {
  return (
    <div className="home">
      <Header headerProps={homeProps.headerProps} />
      <nav className="home__nav">
        <Link to="/main">main</Link>
      </nav>
      <Outlet className="home__oultlet" />
      <Footer footerProps={homeProps.footerProps} />
    </div>
  )
}

export default Home;