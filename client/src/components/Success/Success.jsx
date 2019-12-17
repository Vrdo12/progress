<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react';
import { useStateValue } from '../../context';
import './Success.scss';

const Success = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  useEffect(() => {}, []);

  return (
    <div className="success">
      <h1>Ваша оплата пошла успешна</h1>
    </div>
  );
};

export default Success;
=======
import React, { useState, useContext, useEffect } from 'react';
import { useStateValue } from '../../context';
import './Success.scss';

const Success = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  useEffect(() => {}, []);

  return (
    <div className="success">
      <h1>Ваша оплата пошла успешна</h1>
    </div>
  );
};

export default Success;
>>>>>>> fd06c73ece4f09d1b65208b7b08016a04d896128
