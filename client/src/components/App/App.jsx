<<<<<<< HEAD
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Route } from 'react-router-dom';
import { useStateValue } from '../../context';
import Header from '../Header';
import Game from '../Game';
import Faq from '../Faq';
import Livedrop from '../Livedrop';
import Footer from '../Footer';
import Agreement from '../Agreement';
import fetchApi from '../../utils/fetchApi';
import Profile from '../Profile';
import Contact from '../Contact';
import Cases from '../Cases';
import Reviews from '../Reviews';
import Success from '../Success';
import Fail from '../Fail';
import './App.scss';

function App() {
  const [{ user, socket }, dispatch] = useStateValue();

  const getGames = () => {
    fetchApi('/games', {
      method: 'GET',
      credentials: 'include',
    }).then(payload => {
      dispatch({ type: 'setGames', payload: payload.encrypted });
    });
  };
  const getUser = info => {
    getFetch();
    dispatch({ type: 'getUser', payload: info });
  };
  const getFetch = () => {
    fetchApi('/user', { method: 'GET', credentials: 'include' })
      .then(res => res)
      .then(data => {
        fetchApi('/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => res)
          .then(info => {
            if (info && info.isLogged) {
              if (info.user) {
                window.localStorage.setItem('user', JSON.stringify(info));
                window.localStorage.setItem('token', info.token);
              }
              const infoUser = jwtDecode(info.user);
              const infoData = info;
              infoData.user = infoUser;
              getUser({
                user: infoData.user,
                fromStorage: true,
                token: infoData.token,
              });
            }
          });
      });
  };

  useEffect(() => {
    const userCheck = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');
    // eslint-disable-next-line no-unused-expressions
    userCheck
      ? getUser({
          user: jwtDecode(userCheck),
          fromStorage: true,
          token,
        })
      : getFetch();
    getFetch();
    getGames();
  }, []);

  return (
    <div>
      <Header />
      <Livedrop />
      <main>
        <Route path="/profile" component={Profile} />
        <Route path="/case/:name" component={Game} />
        <Route exact path="/" component={Game} />
        <Route exact path="/" component={Cases} />
        <Route path="/faq" component={Faq} />
        <Route path="/agreement" component={Agreement} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/contact" component={Contact} />
        <Route path="/success" component={Success} />
        <Route path="/fail" component={Fail} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
=======
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Route } from 'react-router-dom';
import { useStateValue } from '../../context';
import Header from '../Header';
import Game from '../Game';
import Faq from '../Faq';
import Livedrop from '../Livedrop';
import Footer from '../Footer';
import Agreement from '../Agreement';
import fetchApi from '../../utils/fetchApi';
import Profile from '../Profile';
import Contact from '../Contact';
import Cases from '../Cases';
import Reviews from '../Reviews';
import Success from '../Success';
import Fail from '../Fail';
import './App.scss';

function App() {
  const [{ user, socket }, dispatch] = useStateValue();

  const getGames = () => {
    fetchApi('/games', {
      method: 'GET',
      credentials: 'include',
    }).then(payload => {
      dispatch({ type: 'setGames', payload: payload.encrypted });
    });
  };
  const getUser = info => {
    getFetch();
    dispatch({ type: 'getUser', payload: info });
  };
  const getFetch = () => {
    fetchApi('/user', { method: 'GET', credentials: 'include' })
      .then(res => res)
      .then(data => {
        fetchApi('/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => res)
          .then(info => {
            if (info && info.isLogged) {
              if (info.user) {
                window.localStorage.setItem('user', JSON.stringify(info));
                window.localStorage.setItem('token', info.token);
              }
              const infoUser = jwtDecode(info.user);
              const infoData = info;
              infoData.user = infoUser;
              getUser({
                user: infoData.user,
                fromStorage: true,
                token: infoData.token,
              });
            }
          });
      });
  };

  useEffect(() => {
    const userCheck = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');
    // eslint-disable-next-line no-unused-expressions
    userCheck
      ? getUser({
          user: jwtDecode(userCheck),
          fromStorage: true,
          token,
        })
      : getFetch();
    getFetch();
    getGames();
  }, []);

  return (
    <div>
      <Header />
      <Livedrop />
      <main>
        <Route path="/profile" component={Profile} />
        <Route path="/case/:name" component={Game} />
        <Route exact path="/" component={Game} />
        <Route exact path="/" component={Cases} />
        <Route path="/faq" component={Faq} />
        <Route path="/agreement" component={Agreement} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/contact" component={Contact} />
        <Route path="/success" component={Success} />
        <Route path="/fail" component={Fail} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
>>>>>>> fd06c73ece4f09d1b65208b7b08016a04d896128
