import {Server} from 'socket.io';

let socket;
let io;

const initIO = (server, port) => {
  io = new Server(server, {
    cors: {
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['react-header'],
      credentials: true,
    },
  });

  io.on('connection', (s) => {
    socket = s;
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
      console.log('a user disconnected', socket.id);
    });
  });

  server.listen(port, () => console.log('Server listening port', port));
};

export {
  initIO,
  socket,
  io,
};