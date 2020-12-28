import { gql } from 'apollo-server-koa';

export default gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;