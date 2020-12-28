import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import { ApolloServer } from 'apollo-server-koa';
import dotenv from 'dotenv';

import typeDefs from './typedefs';
import resolvers from './resolvers';
import models from './models';

dotenv.config();
const port = process.env.SERVER_PORT || 3000;
const app = new Koa();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  }
});

app.use(helmet());
app.use(cors());

server.applyMiddleware({ app });
app.listen({port}, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`))