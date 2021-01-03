import { gql } from 'apollo-server-koa';

export default gql`
extend type Query {
  venues: [Venue]!
}

extend type Mutation {
  addVenue( id: Int, name: String!, latitude: Float!, longitude: Float!): Venue!
}
  type Venue {
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    concerts: [Concert]
  }
`;