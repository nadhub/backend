import { gql } from 'apollo-server-koa';

export default gql`
  scalar Date
  extend type Query {
    concerts(offset: Int, limit: Int): [Concert]!
    concertsCount: Int
    concertByBand(bandId: Int): [Concert]
    concertByVenue(venueId: Int): [Concert]
  }
  type Concert {
    band: Band!
    venue: Venue!
    date: Date!
  }
`;