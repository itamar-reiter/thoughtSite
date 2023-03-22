import React from 'react';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Routes } from 'react-router-dom';

function Home({ homeProps }) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='main/*' element={<Main mainProps={homeProps.mainProps} />} />
        <Route path='login/*' element={!homeProps.loginProps.isLoggedIn && <Login loginProps={homeProps.loginProps} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default Home