import RegisterNewSurvivor from '../../../services/addSurvivor';
import SurvivorFakeDBAdapter from '../../mocks/survivorAdapter/SuvivorFakeDBAdapter';
import { SurvivorDTO } from '../../../domain/survivor';

let registerNewSurvivor: RegisterNewSurvivor;
let survivorFakeDBAdapter: SurvivorFakeDBAdapter;

describe('tests responsible for validating business rules aimed at the survivor', () => {
  beforeAll(() => {
    survivorFakeDBAdapter = new SurvivorFakeDBAdapter();
  });
  beforeEach(() => {
    registerNewSurvivor = new RegisterNewSurvivor(survivorFakeDBAdapter);
  });

  function defaultSurvivor() {
    return {
      name: 'Joeh Doe',
      age: 19,
      lastLocation: {
        latitude: -55.5555,
        longitude: 55.5555,
      },
    };
  }

  it('expected it is possible to register a survivor contains name, age, gender and last location (latitude, longitude)', async () => {
    expect.hasAssertions();

    const survivo: SurvivorDTO = defaultSurvivor();

    const survivorRegistred = await registerNewSurvivor.execute(survivo);

    expect(survivorRegistred).not.toBeNull();
    expect(survivorRegistred).not.toBeUndefined();
    expect(survivorRegistred.id).not.toBeNull();
    expect(survivorRegistred.id).not.toBeUndefined();
  });

  it.todo('I hope a survivor does not contain the same repository as another survivor');

  it.todo('Expected it is possible to register a survivor with his basic items');

  it.todo('I hope it is not possible to register a survivor with no basic informations');
});
