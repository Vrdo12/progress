import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import { StateProvider } from '../../context';
import fetchApi from '../../utils/fetchApi';
import EN from '../../trans/en.json';
import RU from '../../trans/ru.json';
import App from '../App';
import '../../../../webpack/payeer_892778523.txt';

const Root = () => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || ':3000';
  const ref = process.env.REF || 'http';

  const storageLang = window.localStorage.getItem('lang');
  const browserLang =
    window.navigator.language.substring(0, 2) ||
    window.navigator.userLanguage.substring(0, 2);
  if (storageLang !== browserLang) {
    window.localStorage.setItem('lang', browserLang);
  }

  const translations = {
    en: EN,
    ru: RU,
  };
  const getTranslate = langCode => key =>
    translations[langCode === 'ru' ? 'ru' : 'ru'][key] || key;

  const url = window.location.origin.match('keyforu')
    ? 'https://steam-keys.herokuapp.com'
    : 'http://localhost:3000';

  const initialState = {
    user: {},
    token: null,
    authenticated: false,
    langCode: browserLang,
    translate: getTranslate(browserLang),
    socket: io(url),
    games: [],
  };

  return (
    <Router>
      <StateProvider initialState={initialState}>
        <App />
      </StateProvider>
    </Router>
  );
};

export default hot(Root);
