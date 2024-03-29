import { v1 } from 'uuid';
import faker from 'faker';
import { ISurvivor, IItem } from '../../domain';

export default {
  JoeDoeSurvivor: (id: string): ISurvivor => ({
    age: 19,
    id,
    infected: false,
    latitude: -55.5555,
    longitude: 55.5555,
    name: 'Joe Doe',
  }),

  generateRandonInitialItems: (length: number): IItem[] => {
    const totalItems = Array.from({
      length,
    }, (_, index) => index);

    const recursiveGenerateRandomPositiveNumber = (ultimoId: number): number => {
      if (ultimoId <= 0) {
        return recursiveGenerateRandomPositiveNumber(faker.random.number(20));
      }
      return ultimoId;
    };

    const startingItemsInformation: IItem[] = totalItems.map((points) => ({
      item_description: faker.lorem.lines(2),
      item_id: v1(),
      item_points: points,
      item_amount_total: recursiveGenerateRandomPositiveNumber(faker.random.number(20)),
    }));

    return startingItemsInformation;
  },
};
