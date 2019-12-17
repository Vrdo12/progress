import React, { useEffect, useState } from 'react';
import guarant from '../../assets/faq/guarant.svg';
import thumb from '../../assets/faq/thumb.png';

import './Faq.scss';

const Footer = () => {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      text: 'Как начать пользоваться сайтом?',
      answer:
        'Авторизуйтесь удобным для Вас способом (Steam, VK).Пополняйте баланс и выбирайте понравившиеся Вам игры.',
      collapsed: false,
    },
    {
      id: 1,
      text: 'Как пополнить Баланс?',
      answer:
        'Для этого необходимо авторизоваться. Далее нажимаем на "+" в правом верхнем углу (возле аватарки), или в профиле нажимаем "Пополнить баланс". Далее вводим необходимую сумму и жмем пополнить. Выбираем удобный способ оплаты и производим оплату.',
      collapsed: false,
    },
    {
      id: 2,
      text: 'Не пришли деньги на баланс, что делать?',
      answer:
        'Обычно средства приходят моментально, но в некоторых случаях требуется подождать 3-5 минут и средства будут начислены. Если средства не пришли по истечению этого времени, напишите в тех. поддержку, Вам обязательно помогут.',
      collapsed: false,
    },
    {
      id: 3,
      text: 'Я купил игру, куда мне придет ключ?',
      answer:
        'Все ключи находятся в профиле на сайте. После того, как получили игру из кейса, зайдите в свой профиль и выберите дальнейшее действие, забрать ключ или продать и получить вырученные средства на свой баланс.',
      collapsed: false,
    },
    {
      id: 4,
      text: 'Как активировать ключи?',
      answer: [
        { title: 'Инструкция для Steam:' },
        { text: 'Активация ключа:' },
        {
          text:
            'Нажмите кнопку «Добавить игру - активировать через Steam» в Steam клиенте - следуйте инструкциям.',
        },
        {
          text: 'Активация гифта (ссылки):',
        },
        {
          text:
            'Войдите в браузере в свой аккаунт Steam. Скопируйте гифт-ссылку рядом с надписью «Ваш ключ» и вставьте его в новую вкладку в браузере.',
        },
        { title: 'Инструкция для Origin:' },
        {
          text:
            'Активируйте полученный ключ в программе Origin, введя купленный ключ в блоке «Активация».',
        },
        { title: 'Инструкция для Uplay:' },
        {
          text:
            'Справа вверху нажмите на «Шестеренку» и далее «Активировать продукт».',
        },
        { title: 'Инструкция для Battle.net:' },
        {
          text:
            'Введите купленный ключ перейдя по ссылке eu.battle.net/account/management/add-game.html и нажмите «Активация».',
        },
      ],
      collapsed: false,
    },
    {
      id: 5,
      text: 'Как активировать Gift?',
      answer: [
        { text: '1. Откройте полученную ссылку (перейдите по ней)' },
        { text: '2. Откроется сайт Steam с сообщением «Вам прислали подарок»' },
        { text: '3. Нажмите "Принять" - «Добавить в библиотеку»' },
        {
          text:
            '4. Игра появится в «Библиотеке» стим-клиента, и ее можно будет загружать.',
        },
        { text: '5. Нажмите "Принять" - «Добавить в библиотеку»' },
        {
          text:
            '6. Игра появится в «Библиотеке» стим-клиента, и ее можно будет загружать',
        },
      ],
      collapsed: false,
    },
    {
      id: 6,
      text: 'Что значит игра до 419 Р?',
      answer:
        'Это значит, что Вам выпала одна из более, чем 900 игр Steam стоимостью от 33 до 419 Р. Получить свой ключ от игры можно в профиле. Продать ее можно за 9 Р до получения, вне зависимости от реальной стоимости игры в игровом магазине Steam.',
      collapsed: false,
    },
    {
      id: 7,
      text: 'В каких странах могут быть активированы игры?',
      answer:
        'Все игры имеют региональную принадлежность и могут быть активированы только в странах бывшего СНГ: России, Украины, Белоруссии, Азербайджана, Армении, Казахстана, Киргизии, Молдавии, Таджикистана, Туркменистана, Узбекистана.',
      collapsed: false,
    },
  ]);

  const collapse = i => e =>
    setQuestions(
      questions.map(item =>
        item.id === i ? { ...item, collapsed: !item.collapsed } : item,
      ),
    );

  useEffect(() => {}, []);

  return (
    <div className="faqHolder">
      <div className="main-width">
        <div className="guarant">
          <div className="item">
            <div className="pic">
              <img src={thumb} alt="thumb" />
            </div>
            <h1 className="title">Честно</h1>
            <div className="text">
              У нас нет проигравших! Каждый получит игру, которая будет стоить в
              стиме 29-2599 рублей. Самое главное, это возможность получить
              Дорогую игру за копейки. В LIVE-ленте отображаются полученные
              игры, реальными клиентами!
            </div>
          </div>
          <div className="item">
            <div className="pic">
              <img src={guarant} alt="guarant" />
            </div>
            <h1 className="title">Надежно</h1>
            <div className="text">
              Мы гарантируем что вы получите ту игру которую выиграли. Если
              возникнут проблемы наша тех. поддержка с удовольствием вас помогут
            </div>
          </div>
        </div>
        <div className="qa">
          <h1>Вопросы и Ответы</h1>
          {questions.map((item, i) => (
            <div
              key={i}
              className={`item ${item.collapsed ? 'collapsed' : ''}`}
            >
              <div className="question">
                <div className="title">Вопрос {i + 1}:</div>
                <div className="text">{item.text}</div>
                <div className="action">
                  <button className="btn" onClick={collapse(i)}>
                    {item.collapsed ? 'Скрыть ответ' : 'Посмотрет ответ'}
                  </button>
                </div>
              </div>
              <div
                className={`answer ${item.collapsed ? 'animated fadeIn' : ''}`}
              >
                {typeof item.answer === 'string'
                  ? item.answer
                  : item.answer.map((item, i) => (
                      <React.Fragment key={i}>
                        {(item.title && <h1>{item.title}</h1>) ||
                          (item.text && <p>{item.text}</p>)}
                      </React.Fragment>
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
