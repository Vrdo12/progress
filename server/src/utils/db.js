const User = require('../models/User');
const Cases = require('../models/Cases');
const Livedrop = require('../models/Livedrop');
const Games = require('../models/Games');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { ADMIN1, ADMIN2 } = process.env;

const register = async data => {
  const user = await new User({
    ip: data.ip,
    email: data.email || data.username,
    username: data.username,
    userID: data.userID,
    imgurl: data.imgurl,
    admin: false,
    profileurl: data.profileurl,
    balance: 0,
    gameHistory: [],
    balanceHistory: [],
  });
  // eslint-disable-next-line no-unused-expressions
  data.userID === ADMIN1 || data.userID === ADMIN2
    ? (user.admin = await true)
    : null;
  await user.save();
  return user;
};

const login = userID => User.findOne({ userID });

const update = async user => {
  login(user.userID).then(data => {
    if (data !== null) {
      if (data.username !== user.username) {
        console.log('Changed name');
        User.updateOne(
          { userID: user.userID },
          { $set: { username: user.username } },
          { new: true },
          (err, doc) => doc,
        );
      }
      if (data.imgurl !== user.imgurl) {
        console.log('Changed image');
        User.updateOne(
          { userID: user.userID },
          { $set: { imgurl: user.imgurl } },
          { new: true },
          (err, doc) => doc,
        );
      }

      if (data.ip.city !== user.ip.city) {
        User.updateOne(
          { userID: user.userID },
          { $set: { ip: user.ip } },
          { new: true },
          (err, doc) => doc,
        );
      }
    } else {
      console.log('New User');
    }
  });
};

const getCase = type => Cases.findOne({ type }).then(res => res);

const getLivedrop = () => Livedrop.find({});

const setLivedrop = async data => {
  const drop = await new Livedrop(data.game);
  await drop.save();
  return drop;
};

const getGames = () => Games.find({});

const getLiveinfo = async () => {
  // Cases.deleteOne({ _id: {} }).then(res => console.log('done', res));
  const openCasesLength = () =>
    new Promise((resolve, reject) => {
      Livedrop.collection.countDocuments({}, {}, (err, res) => resolve(res));
    });

  const usersLength = () =>
    new Promise((resolve, reject) => {
      User.collection.countDocuments({}, {}, (err, res) => resolve(res));
    });

  return Promise.all([await usersLength(), await openCasesLength()]).then(
    val => val,
  );
};

const addBalance = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
        },
        {
          $set: {
            balance: res.balance + Number(data.amount),
            balanceHistory: [
              ...res.balanceHistory,
              {
                pay_id: data.pay_id,
                amount: data.amount,
                date: new Date(),
              },
            ],
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc || {}),
      );
    });
  });

const sellGame = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
          'gameHistory._id': data._id,
        },
        {
          $set: {
            balance: res.balance + data.sellPrice,
            'gameHistory.$.action': 'selled',
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc),
      );
    });
  });

const removeBalance = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      if (data.type === 'balance') {
        Livedrop.collection.countDocuments({}, {}, (error, count) => {
          const order = data.caseType === 'xujan' ? data.order : count + 1;
          User.findOneAndUpdate(
            { userID: user.userID },
            {
              $set: {
                balance: res.balance - data.price,
                gameHistory: [
                  ...res.gameHistory,
                  {
                    key: '',
                    order,
                    sellPrice: data.sellPrice,
                    caseType: data.caseType,
                    name: data.name,
                    action: 'waiting',
                    date: new Date(),
                  },
                ],
              },
            },
            { new: true },
            (err, doc) => resolve(doc._doc || {}),
          );
        });
      }
    });
  });

const getKey = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
          'gameHistory._id': data._id,
        },
        {
          $set: {
            'gameHistory.$.action': 'key',
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc),
      );
    });
  });

module.exports = {
  login,
  register,
  update,
  getCase,
  setLivedrop,
  getLivedrop,
  getGames,
  getLiveinfo,
  removeBalance,
  sellGame,
  getKey,
  addBalance,
};
