'use strict';

import https from 'https';
import http from 'http';
import fs from 'fs';
import {initIO} from './socket';

const httpsPort = process.env.HTTPS_PORT || 8000;

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert,
};

export default (app, port) => {
  const httpsServer = https.createServer(options, app);
  initIO(httpsServer, httpsPort);

  http.createServer((req, res) => {
    res.writeHead(301,
        {'Location': `https://localhost:${httpsPort}` + req.url});
    res.end();
  }).listen(port, () => console.log(`Localhost app listening port ${port}`));
};