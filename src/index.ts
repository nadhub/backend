import Koa from 'koa';
import KoaRouter from 'koa-router';
// import helmet from 'koa-helmet';
import cors from '@koa/cors';
import { ApolloServer } from 'apollo-server-koa';
import dotenv from 'dotenv';

import typeDefs from './typedefs';
import resolvers from './resolvers';
import models from './models';

dotenv.config();

const main = async () => {
  const port = process.env.SERVER_PORT || 3000;
  const app = createApp();
  app.listen({port}, () => console.log(`Server ready at http://localhost:${port}`));
};

export const createApp = (): Koa => {
  const app = new Koa();
  const router = new KoaRouter();
  // app.use(helmet({}));
  app.use(cors());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      models,
    },
    // formatError: errorHandler,
  });
  router.get('/healthz', ctx => {
    ctx.body = { success: true};
  });
  router.get('/graphql', server.getMiddleware());
  router.post('/graphql', server.getMiddleware());
  app.use(router.routes()).use(router.allowedMethods());
  return app;
};

// const errorHandler = (err: Error) => {
//   console.log('Error while running resolver', {
//     error: err
//   });
//   return new Error('Internal server error');
// };

if (require.main === module) {
  main();
}