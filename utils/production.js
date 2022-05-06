'use strict';

import http from 'http';
import {initIO} from './socket';

export default (app, port) => {
  app.enable('trust proxy');

  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  const httpServer = http.createServer(app);
  initIO(httpServer, port);
  //app.listen(port, () => { console.log(`app listen on port ${port}`);});
};