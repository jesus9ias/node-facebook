import connection from './connection';
import { matchHash, createToken } from './hasher'

export default io => socket => {
  console.log('start sockets');

  socket.on('doLogin', (data) => {
    console.log(data);

    connection.query('select * from users where userName = ?', [data.userName], (err, result) => {
      if (!err) {
        if (result.length === 1) {
          if (matchHash(data.password, result[0].pass)) {
            const token = createToken({
              userName: data.userName
            });

            io.emit('successLogin', token);
          } else {
            console.log('failedLogin', 'invalid credentials')
            io.emit('failedLogin', 'invalid credentials');
          }
        } else {
          console.log('failedLogin', 'user not found')
          io.emit('failedLogin', 'user not found');
        }
      } else {
        console.log('failedLogin', err.message)
        io.emit('failedLogin', err.message);
      }
    });
  });

  socket.on('sendState', (text) => {
    console.log(text);
    const data = {
      text,
      id: socket.id
    }
    io.emit('broadcastState', data);
  });
};
