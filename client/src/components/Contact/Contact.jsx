import React, { useEffect, useState } from 'react';
import guarant from '../../assets/faq/guarant.svg';
import thumb from '../../assets/faq/thumb.png';

import './Contact.scss';

const Contact = () => (
  <div className="contacts">
    <h1 className="title">Контакты</h1>
    <p>
      Наша тех. поддержка будет помогать вас если возникли какие то проблемы,
      пожалуйста свяжитесь с нами через
    </p>
    <p>
      Наш VK -
      <span>
        <a href="https://vk.com/club184431451">https://vk.com/club184431451</a>
      </span>
    </p>
    <p>
      Наш Email - <span>keyforu@list.ru</span>
    </p>
  </div>
);

export default Contact;
