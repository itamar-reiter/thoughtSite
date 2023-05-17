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
      <Header />
      <nav className="home__nav">
        <Link to="/home/main">main</Link>
        <Link to="/home/login">login</Link>
      </nav>
      <Outlet className="home__oultlet"/>
      <Footer />
    </div>
  )
}

export default Home;