import { v1 } from 'uuid';
import FlagSurvivorAsInfectedService from '../../services/FlagSurvivorAsInfected';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import utils from '../utils';

const { JoeDoeSurvivor } = utils;

let flagSurvivorAsInfectedService: FlagSurvivorAsInfectedService;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;

describe('tests responsible for validating rules related to marking the survivor as infected', () => {
  beforeEach(() => {
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    flagSurvivorAsInfectedService = new FlagSurvivorAsInfectedService(suvivorFakeDBAdapter);
  });

  it('should be able to add flag of infected into one survivor', async () => {
    expect.hasAssertions();

    const joeDoe = JoeDoeSurvivor(v1());
    await suvivorFakeDBAdapter.addSurvivor(joeDoe);

    const survivorInfected = await flagSurvivorAsInfectedService.execute(joeDoe.id);

    expect(survivorInfected).not.toBeUndefined();
    expect(survivorInfected).not.toBeNull();
    expect(survivorInfected.infected).toBe(true);
  });
});
