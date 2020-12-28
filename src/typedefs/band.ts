import { gql } from 'apollo-server-koa';

export default gql`
extend type Query {
  bands: [Band]!
}
  type Band {
    id: ID!
    name: String!
    concerts: [Concert]
  }
`;