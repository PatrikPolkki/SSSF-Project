'use strict';

import express from 'express';
import db from './utils/db';

const app = express();
const port = 3000;

db.on('connected', () => {
  app.listen(port, () => {console.log(`app listen on port ${port}`);});
});