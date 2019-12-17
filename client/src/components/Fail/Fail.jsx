<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react';
import { useStateValue } from '../../context';
import './Fail.scss';

const Fail = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  useEffect(() => {}, []);

  return (
    <div className="fail">
      <h1>Что то пошло не так попробуйте еще раз</h1>
    </div>
  );
};

export default Fail;
=======
import React, { useState, useContext, useEffect } from 'react';
import { useStateValue } from '../../context';
import './Fail.scss';

const Fail = () => {
  const [{ user, authenticated, translate }, dispatch] = useStateValue();

  useEffect(() => {}, []);

  return (
    <div className="fail">
      <h1>Что то пошло не так попробуйте еще раз</h1>
    </div>
  );
};

export default Fail;
>>>>>>> fd06c73ece4f09d1b65208b7b08016a04d896128
