/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISearchCriteria } from '../src/interfaces';
import { getConcertsByBands, getConcertsLocationWithInRadius, isBandIdsValid, isGeographyArgsValid } from '../src/resolvers/helpers';
import models from '../src/models';
import { Op } from 'sequelize';

jasmine.DEFAULT_TIMEOUT_INTERVAL=60000;
describe('Helpers', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const args: ISearchCriteria = { bandIds: [1,2], latitude: 43.63967479999999, longitude: -79.3535794, radius: 20 };
  describe('isbandIds helpers', () => {
    it('isBandIds: return false if no argumens', () => {
    const { bandIds, ...argsGeo } = args;
    expect(isBandIdsValid(argsGeo)).toEqual(false);
    });
    it('isBandIds: return false if empty array', () => {
      const { bandIds, ...argsGeo } = args;
      expect(isBandIdsValid({ bandIds: [], ...argsGeo})).toEqual(false);
    });
    it('isBandIds: return false if element array with not a numbers', () => {
      const { bandIds, ...argsGeo } = args;
      expect(isBandIdsValid({ bandIds: [1,2, 'ad'] as any, ...argsGeo})).toEqual(false);
    });
    it('isBandIds: return true if array with numbers', () => {
      expect(isBandIdsValid(args)).toEqual(true);
    });
  });
  
  describe('GeographyCriteria helper', () => {
    it('isGeographyArgsValid: return false if argument latitude is missed', () => {
      const { latitude, ...argsGeo } = args;
      expect(isGeographyArgsValid(argsGeo)).toEqual(false);
      });
      it('isGeographyArgsValid: return false if argument longitude is missed', () => {
        const { longitude, ...argsGeo } = args;
        expect(isGeographyArgsValid({...argsGeo})).toEqual(false);
      });
      it('isGeographyArgsValid: return false if radius argument is missed', () => {
        const { radius, ...argsGeo } = args;
        expect(isGeographyArgsValid(argsGeo)).toEqual(false);
      });
      it('isGeographyArgsValid: return false if not number ', () => {
        const { latitude, ...argsGeo } = args;
        expect(isGeographyArgsValid({latitude: 'test' as any, ...argsGeo})).toEqual(false);
      });
      it('isGeographyArgsValid: return true if ', () => {
        expect(isGeographyArgsValid(args)).toEqual(true);
      });
  });
  describe('getConcertsByBands function', () => {
    it('Should call once the concertModel\'s findAll method  ', async () => {
       const date = new Date();
       const mockConcertData = models.concertModel.build({ bandId: 1, venueId: 2, date});
       const spyfindall = jest.spyOn(models.concertModel, 'findAll').mockResolvedValueOnce([mockConcertData]);
       const result = await getConcertsByBands({bandIds: [1]}, models);
       expect(spyfindall).toHaveBeenCalledTimes(1);
       expect(result[0].bandId).toStrictEqual(mockConcertData.getDataValue('bandId'));
      });
  });
  describe('getConcertsLocationWithInRadius function', () => {
    it('Should call once the concertModel\'s findAll method  ', async () => {
      const date = new Date();
       const mockConcertData = models.concertModel.build({ bandId: 1, venueId: 2, date});
       const mockVenueData = models.venueModel.build({id: 13, name: 'Qudos Bank Arena, Sydney, NSW, Australia', latitude: -33.8443038, longitude: 151.0620838 });
       const spyConcertfindall = jest.spyOn(models.concertModel, 'findAll').mockResolvedValueOnce([mockConcertData]);
       const spyVenuefindall = jest.spyOn(models.venueModel, 'findAll').mockResolvedValueOnce([mockVenueData]);
       await getConcertsLocationWithInRadius(args, models);
       expect(spyConcertfindall).toHaveBeenCalledWith({'attributes': ['venueId'], 'where': {'bandId': {[Op.in]: [1, 2]}}});
       expect(spyVenuefindall).toHaveBeenCalled();
      });
  });
});