const db = require('../utils/db');

let userCount = 0;
module.exports = io => {
  io.on('connection', socket => {
    global.socket = socket;
    socket.on('disconnect', () => {
      userCount -= 1;
      io.emit('userCount', { userCount });
    });
    userCount += 1;
    io.emit('userCount', { userCount });

    socket.on('opened case', data => {
      if (data.game.type !== 'xujan') {
        db.setLivedrop(data).then(res => {
          setTimeout(() => {
            io.emit('update live', res);
          }, 5500);
        });
      }
    });

    if (!socket.sentLivedrop) {
      socket.on('emit getlive', res => {
        db.getLivedrop().then(data => {
          data = data.reverse().slice(0, 10);
          socket.emit('get live', data);
        });
      });
      socket.sentLivedrop = true;
    }
  });
};
