import React, { useState } from 'react';
import { useStateValue } from '../../../context';
import './Item.scss';

const Item = () => {
  const [{ user, authenticated, cases }] = useStateValue();

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map((item, index) => {
      images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../../../assets/slots', false, /\.(png|jpe?g|svg)$/),
  );

  return (
    (cases &&
      cases.data &&
      cases.data.map((item, i) => (
        <div key={i} className={`item ${item.img}`}>
          <img src={images[item.img]} alt="" />
        </div>
      ))) || <h2>Case not found</h2>
  );
};

export default Item;
