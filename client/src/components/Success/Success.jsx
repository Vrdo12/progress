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
