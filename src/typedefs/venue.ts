import { gql } from 'apollo-server-koa';

export default gql`
extend type Query {
  venues: [Venue]!
}
  type Venue {
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    concerts: [Concert]
  }
`;