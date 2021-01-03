import { gql } from 'apollo-server-koa';

export default gql`
  scalar Date
  extend type Query {
    concertsByBandAndLocationWithInRadius(bandIds: [Int], latitude: Float, longitude: Float, radius: Int): [Concert]
  }
  type Concert {
    band: Band!
    venue: Venue!
    date: Date!
  }
`;