import supertest from 'supertest';
import { createApp } from '../src';
import models from '../src/models';
import concertResolver from '../src/resolvers/concert';

const request = supertest(createApp().listen());

jasmine.DEFAULT_TIMEOUT_INTERVAL=60000;
describe('Test routes, queries apollo server', () => {

  jest.spyOn(concertResolver.Query, 'concertsByBandAndLocationWithInRadius').mockResolvedValueOnce([]);
  jest.spyOn(models.concertModel, 'findAll').mockResolvedValue([]);
  jest.spyOn(models.venueModel, 'findAll').mockResolvedValue([]);

  it('Should query concertsByBandAndLocationWithInRadius', async () => {
    await request
    .post('/graphql')
    .send({
      'query': '{concertsByBandAndLocationWithInRadius(bandIds: [129, 95, 123, 135] latitude: 48.8598659 longitude: 2.347761 radius: 50) { venue {id name latitude longitude }}}',
    }).expect('Content-Type', /json/)
    .expect(200);
  });

  it('Should query return 200 if bandIds parameter is passed', async () => {
    await request
    .post('/graphql')
    .send({
      'query': '{concertsByBandAndLocationWithInRadius(bandIds: [129, 95, 123, 135]) { venue {id name latitude longitude }}}',
    }).expect('Content-Type', /json/)
    .expect(200);
  });

  it('Should query return 200 if latitude, longitude and radius parameters are passed', async () => {
    await request
    .post('/graphql')
    .send({
      'query': '{concertsByBandAndLocationWithInRadius(latitude: 48.8598659 longitude: 2.347761 radius: 50) { venue {id name latitude longitude }}}',
    }).expect('Content-Type', /json/)
    .expect(200);
  });

  it('Should query throw an error if neither bandIds nor latitude is passed as parameters', async () => {
    await request
    .post('/graphql')
    .send({
      'query': '{concertsByBandAndLocationWithInRadius(longitude: 2.347761 radius: 50) { venue {id name latitude longitude }}}',
    }).expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.error).not.toBeUndefined;
    });
  });
});