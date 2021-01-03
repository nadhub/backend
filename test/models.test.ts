import { Model } from 'sequelize';
import models from '../src/models';

jasmine.DEFAULT_TIMEOUT_INTERVAL=60000;
describe('Models', () => {

  describe('Concert', () => {
    let instance;
    beforeEach(() => {
      instance = models.concertModel.build({ bandId: 1, venueId: 1, date: new Date('2020-12-25')});
    });
    it('Should be of Model instance', () => {
      expect(instance instanceof Model).toBe(true);
    });
    it('Have property bandId', async() => {
      expect(instance.bandId).toEqual(1);
    });
    it('Have property venueId', async() => {
      expect(instance.venueId).toEqual(1);
    });
    it('Have property date', async() => {
      expect(instance.date).not.toBeUndefined();
    });
    it('Should return date in unix format', async() => {
      expect(instance.date).toEqual(1608854400000);
    });
  });
  describe('Band', () => {
    let bandInstance;
    beforeEach(() => {
      bandInstance = models.bandModel.build({ id: 1, name: 'band test'});
    });
    it('Should be of Model instance', () => {
      expect(bandInstance instanceof Model).toBe(true);
    });
    it('Have property id', async() => {
      expect(bandInstance.id).toEqual(1);
    });
    it('Have property name', async() => {
      expect(bandInstance.name).toEqual('band test');
    });
  });


});