import { v1 } from 'uuid';
import UpdateSurvivorLocation from '../../services/UpdateSurvivorLocation';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import { coords_of_survivor } from '../../domain';
import utils from '../utils';
import DomainError from '../../usecases/validations/DomainErro';

const { JoeDoeSurvivor } = utils;
let updateSurvivorLocation: UpdateSurvivorLocation;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;

describe('tests responsible for validating rules for changing the survivor location', () => {
  beforeEach(() => {
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    updateSurvivorLocation = new UpdateSurvivorLocation(suvivorFakeDBAdapter);
  });

  it('should be able to change of survivor location', async () => {
    expect.hasAssertions();

    const survivor = await suvivorFakeDBAdapter.addSurvivor({
      ...JoeDoeSurvivor(v1()),
    });

    expect(survivor).not.toBeUndefined();

    const newCoordsOfSurvivor: coords_of_survivor = {
      latitude: -44.0021,
      longitude: 44.0021,
    };

    const updatedSurvivor = await updateSurvivorLocation
      .execute(survivor.id, newCoordsOfSurvivor);

    expect(updatedSurvivor.lastLocation).toStrictEqual(newCoordsOfSurvivor);
  });

  it('should be not able to update survivor location if survivor does not exists', async () => {
    expect.hasAssertions();

    const JoeDoe = JoeDoeSurvivor(v1());

    const newCoordsOfSurvivor: coords_of_survivor = {
      latitude: -44.0021,
      longitude: 44.0021,
    };

    await expect(updateSurvivorLocation
      .execute(JoeDoe.id, newCoordsOfSurvivor))
      .rejects
      .toBeInstanceOf(DomainError);
  });
});
