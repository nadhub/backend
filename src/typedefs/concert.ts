import { gql } from 'apollo-server-koa';

export default gql`
  scalar Date
  extend type Query {
    concerts: [Concert]!
    concertCount: Int
    concertByBand(bandid!: Int): [Concert]
    concertByVenue(venueid!: Int): [Concert]
  }
  type Concert {
    band: Band!
    venue: Venue!
    date: Date
  }
`;