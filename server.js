'use strict';

import express from 'express';
import db from './utils/db';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import {checkAuth} from './utils/auth';

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({req}) => {
        if (req) {
          const user = await checkAuth(req);
          // const user = true;
          console.log('app', user);
          return {req, user};
        }
      },
    });

    const app = express();

    await server.start();

    server.applyMiddleware({app});

    db.on('Connected', () => {});
    app.listen({port: process.env.PORT || 3000}, () => {
      console.log(
          `🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
    });
  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();