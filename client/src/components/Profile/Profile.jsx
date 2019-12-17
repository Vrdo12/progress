<<<<<<< HEAD
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useStateValue } from '../../context';
import fetchApi from '../../utils/fetchApi';
import './Profile.scss';

const Profile = () => {
  const [{ user, translate }, dispatch] = useStateValue();
  const [count, setCount] = useState(10);
  const [showMore, setShowmore] = useState(false);
  const [disableButton, disableButtons] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [sum, setSum] = useState(1000);

  const logout = () => e => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    fetchApi('/logout', { method: 'GET', credentials: 'include' }).then(res => {
      if (!res.isLogged) {
        window.open(`${window.location.origin}/`, '_self');
      }
    });
  };

  const sellGame = game => e => {
    disableButtons(true);
    fetchApi('/sellgame', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
      disableButtons(false);
    });
  };

  const getKey = game => e => {
    disableButtons(true);
    fetchApi('/getkey', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
      disableButtons(false);
    });
  };

  const onShowMore = () => e => {
    if (showMore) {
      setCount(10);
      setShowmore(false);
    } else {
      setCount(user.gameHistory.length);
      setShowmore(true);
    }
  };

  const openModal = () => e => {
    setModal(true);
    setSum(1000);
  };

  const addBalance = () => e => {
    const data = {
      shop: 4285,
      payment: 110857,
      amount: sum,
      description: 'Оплата товара',
      currency: 3,
      sign: 'OirW4Mt+i0g3v6Yb+0yenYeqPqKYoimjehJEKZC1v+w=',
      via: 'qiwi',
    };
    console.log(data);
    fetch('https://primepayer.com/api/110857/pay', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer w46kofoy10afthh95ir4z8cx2k0mr4hcob9s6bd7f0dxxzboianmnpgwxfx1yhba',
      },
      body: JSON.stringify(data),
    }).then(res => {
      console.log(res);
    });
    fetchApi('/addbalance', {
      method: 'POST',
      body: JSON.stringify({ sum }),
    });
  };
  const handeleChange = val => {
    if (val.match(/^[0-9]+$/)) {
      setSum(val);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Modal
        closeTimeoutMS={200}
        ariaHideApp={false}
        onRequestClose={() => setModal(false)}
        shouldCloseOnOverlayClick={true}
        isOpen={modalIsOpen}
        className="Modal"
        overlayClassName="OverlayHeader"
      >
        <div className="header">
          <div />
          <h1>ПОПОЛНЕНИЕ БАЛАНСА</h1>
          <div className="close">
            <MdClose onClick={() => setModal(false)} />
          </div>
        </div>
        <div className="body">
          <h1>Введите сумму</h1>
          <div className="inpHolder">
            <input
              type="text"
              className="input"
              name="sum"
              value={sum}
              onChange={e => handeleChange(e.target.value)}
            />
            <button onClick={addBalance()}>Пополнить</button>
          </div>
          <div className="info">
            Средства приходят моментально, но могут быть задержки до 5-10 минут.
          </div>
        </div>
      </Modal>
      <div className="profile">
        <div className="main-width">
          <div className="info">
            <h1 className="name">{user.username}</h1>
            <div className="avatar">
              <img src={user.imgurl} alt="" />
            </div>
            <div className="actions">
              <button className="auth" onClick={openModal()}>
                {translate('add_balance')}
              </button>
              <button className="auth" onClick={logout()}>
                Выйти
              </button>
            </div>
            <div className="gamesHistory">
              <div className="tableHeader">
                <div className="order">#</div>
                <div className="name">Имя</div>
                <div className="action">Действие</div>
                <div className="date">Дата</div>
              </div>
              {user.gameHistory &&
                user.gameHistory.slice(0, count).map((item, i) => (
                  <div key={i} className="gameItem">
                    <div className="order">{item.order}</div>
                    <div className="name">
                      {item.name === 'other' ? 'Игра до 419 рублей' : item.name}
                    </div>
                    {item.key ? (
                      <div className="action">
                        <p>{item.key}</p>
                      </div>
                    ) : item.action === 'waiting' ? (
                      <div className="action">
                        {(item.caseType === 'bronze' ||
                          item.caseType === 'metallic' ||
                          item.caseType === 'silver' ||
                          item.caseType === 'gold' ||
                          item.name === 'other') && (
                          <button
                            disabled={disableButton}
                            className="btn"
                            onClick={sellGame(item)}
                          >
                            Продать за {item.sellPrice}
                          </button>
                        )}
                        <button
                          disabled={disableButton}
                          className="btn"
                          onClick={getKey(item)}
                        >
                          Взять ключ
                        </button>
                      </div>
                    ) : item.action === 'selled' ? (
                      <div className="action">
                        <p>Продано</p>
                      </div>
                    ) : item.action === 'key' ? (
                      <div className="action">
                        <p>{item.key || 'Wait For Key'}</p>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="date">
                      <Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} />
                    </div>
                  </div>
                ))}

              <button className="showMore" onClick={onShowMore()}>
                {showMore ? translate('showLess') : translate('showMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
=======
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useStateValue } from '../../context';
import fetchApi from '../../utils/fetchApi';
import './Profile.scss';

const Profile = () => {
  const [{ user, translate }, dispatch] = useStateValue();
  const [count, setCount] = useState(10);
  const [showMore, setShowmore] = useState(false);
  const [disableButton, disableButtons] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [sum, setSum] = useState(1000);

  const logout = () => e => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    fetchApi('/logout', { method: 'GET', credentials: 'include' }).then(res => {
      if (!res.isLogged) {
        window.open(`${window.location.origin}/`, '_self');
      }
    });
  };

  const sellGame = game => e => {
    disableButtons(true);
    fetchApi('/sellgame', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
      disableButtons(false);
    });
  };

  const getKey = game => e => {
    disableButtons(true);
    fetchApi('/getkey', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...game }),
    }).then(data => {
      dispatch({ type: 'updateUser', payload: { ...data } });
      disableButtons(false);
    });
  };

  const onShowMore = () => e => {
    if (showMore) {
      setCount(10);
      setShowmore(false);
    } else {
      setCount(user.gameHistory.length);
      setShowmore(true);
    }
  };

  const openModal = () => e => {
    setModal(true);
    setSum(1000);
  };

  const addBalance = () => e => {
    const data = {
      shop: 4285,
      payment: 110857,
      amount: sum,
      description: 'Оплата товара',
      currency: 3,
      sign: 'OirW4Mt+i0g3v6Yb+0yenYeqPqKYoimjehJEKZC1v+w=',
      via: 'qiwi',
    };
    console.log(data);
    fetch('https://primepayer.com/api/110857/pay', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer w46kofoy10afthh95ir4z8cx2k0mr4hcob9s6bd7f0dxxzboianmnpgwxfx1yhba',
      },
      body: JSON.stringify(data),
    }).then(res => {
      console.log(res);
    });
    fetchApi('/addbalance', {
      method: 'POST',
      body: JSON.stringify({ sum }),
    });
  };
  const handeleChange = val => {
    if (val.match(/^[0-9]+$/)) {
      setSum(val);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Modal
        closeTimeoutMS={200}
        ariaHideApp={false}
        onRequestClose={() => setModal(false)}
        shouldCloseOnOverlayClick={true}
        isOpen={modalIsOpen}
        className="Modal"
        overlayClassName="OverlayHeader"
      >
        <div className="header">
          <div />
          <h1>ПОПОЛНЕНИЕ БАЛАНСА</h1>
          <div className="close">
            <MdClose onClick={() => setModal(false)} />
          </div>
        </div>
        <div className="body">
          <h1>Введите сумму</h1>
          <div className="inpHolder">
            <input
              type="text"
              className="input"
              name="sum"
              value={sum}
              onChange={e => handeleChange(e.target.value)}
            />
            <button onClick={addBalance()}>Пополнить</button>
          </div>
          <div className="info">
            Средства приходят моментально, но могут быть задержки до 5-10 минут.
          </div>
        </div>
      </Modal>
      <div className="profile">
        <div className="main-width">
          <div className="info">
            <h1 className="name">{user.username}</h1>
            <div className="avatar">
              <img src={user.imgurl} alt="" />
            </div>
            <div className="actions">
              <button className="auth" onClick={openModal()}>
                {translate('add_balance')}
              </button>
              <button className="auth" onClick={logout()}>
                Выйти
              </button>
            </div>
            <div className="gamesHistory">
              <div className="tableHeader">
                <div className="order">#</div>
                <div className="name">Имя</div>
                <div className="action">Действие</div>
                <div className="date">Дата</div>
              </div>
              {user.gameHistory &&
                user.gameHistory.slice(0, count).map((item, i) => (
                  <div key={i} className="gameItem">
                    <div className="order">{item.order}</div>
                    <div className="name">
                      {item.name === 'other' ? 'Игра до 419 рублей' : item.name}
                    </div>
                    {item.key ? (
                      <div className="action">
                        <p>{item.key}</p>
                      </div>
                    ) : item.action === 'waiting' ? (
                      <div className="action">
                        {(item.caseType === 'bronze' ||
                          item.caseType === 'metallic' ||
                          item.caseType === 'silver' ||
                          item.caseType === 'gold' ||
                          item.name === 'other') && (
                          <button
                            disabled={disableButton}
                            className="btn"
                            onClick={sellGame(item)}
                          >
                            Продать за {item.sellPrice}
                          </button>
                        )}
                        <button
                          disabled={disableButton}
                          className="btn"
                          onClick={getKey(item)}
                        >
                          Взять ключ
                        </button>
                      </div>
                    ) : item.action === 'selled' ? (
                      <div className="action">
                        <p>Продано</p>
                      </div>
                    ) : item.action === 'key' ? (
                      <div className="action">
                        <p>{item.key || 'Wait For Key'}</p>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="date">
                      <Moment format="YYYY-MM-DD  HH:mm:ss" date={item.date} />
                    </div>
                  </div>
                ))}

              <button className="showMore" onClick={onShowMore()}>
                {showMore ? translate('showLess') : translate('showMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
>>>>>>> fd06c73ece4f09d1b65208b7b08016a04d896128
