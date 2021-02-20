import RegisterNewSurvivor from '../../../services/addSurvivor';
import { ISurvivor } from '../../../domain/survivor';

let registerNewSurvivor: RegisterNewSurvivor;

describe('tests responsible for validating business rules aimed at the survivor', () => {
  beforeEach(() => {
    registerNewSurvivor = new RegisterNewSurvivor();
  });

  it('expected it is possible to register a survivor contains name, age, gender and last location (latitude, longitude)', async () => {
    expect.hasAssertions();

    const survivo: Omit<ISurvivor, 'id'> = {
      name: 'Joeh Doe',
      age: 19,
      lastLocation: {
        latitude: -55.5555,
        longitude: 55.5555,
      },
      infected: false,
      inventory_id: 1,
    };

    const survivorRegistred = await registerNewSurvivor.execute(survivo);

    expect(survivorRegistred).not.toBeNull();
    expect(survivorRegistred).not.toBeUndefined();
    expect(survivorRegistred.id).not.toBeNull();
    expect(survivorRegistred.id).not.toBeUndefined();
  });

  it.todo('It must not be possible to register a survivor already registered');

  it.todo('Expected it is possible to register a survivor with his basic items');

  it.todo('I hope it is not possible to register a survivor with no basic informations');
});
