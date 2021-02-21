import { ISurvivor } from '../../domain';

export default {
  JoeDoeSurvivor: (id: string): ISurvivor => ({
    age: 19,
    id,
    infected: false,
    lastLocation: {
      latitude: -55.5555,
      longitude: 55.5555,
    },
    name: 'Joe Doe',
  }),
};
