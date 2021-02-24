import { v1 } from 'uuid';
import FlagSurvivorAsInfectedService from '../../services/FlagSurvivorAsInfected';
import SuvivorFakeDBAdapter from '../mocks/SurvivorFakeDBAdapter';
import utils from '../utils';
import DomainError from '../../usecases/validations/DomainErro';

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

    // 5 survivors needed to report an infected
    const [infectedSurvivor, ...reporterUsers] = await Promise.all([
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
    ]);

    const reports = reporterUsers.map(
      (reporter) => flagSurvivorAsInfectedService.execute(reporter.id, infectedSurvivor.id),
    );

    const resultOfReports = await Promise.all(reports);

    const lastReportResult = resultOfReports[resultOfReports.length - 1];

    expect(lastReportResult).not.toBeUndefined();
    expect(lastReportResult).not.toBeNull();
    expect(lastReportResult.infected).toBe(true);
  });

  it('an infected survivor cannot report another survivor', async () => {
    expect.hasAssertions();

    const joeDoeTraitor = JoeDoeSurvivor(v1());
    const joeDoeSurvivor = JoeDoeSurvivor(v1());

    joeDoeTraitor.infected = true;

    await Promise.all([
      suvivorFakeDBAdapter.addSurvivor(joeDoeTraitor),
      suvivorFakeDBAdapter.addSurvivor(joeDoeSurvivor),
    ]);

    await expect(flagSurvivorAsInfectedService.execute(
      joeDoeTraitor.id,
      joeDoeSurvivor.id,
    )).rejects.toBeInstanceOf(DomainError);
  });

  it('should there is validation if the survivor exists', async () => {
    expect.hasAssertions();

    const joeDoeSurvivor = JoeDoeSurvivor(v1());
    const joeDoeSurvivor2 = JoeDoeSurvivor(v1());

    await expect(
      flagSurvivorAsInfectedService
        .execute(joeDoeSurvivor.id, joeDoeSurvivor2.id),
    ).rejects.toBeInstanceOf(DomainError);
  });

  it('should there is validation of the survivor is already infected', async () => {
    expect.hasAssertions();

    const joeDoeTraitor = JoeDoeSurvivor(v1());
    const joeDoeSurvivor = JoeDoeSurvivor(v1());

    joeDoeTraitor.infected = true;

    await Promise.all([
      suvivorFakeDBAdapter.addSurvivor(joeDoeTraitor),
      suvivorFakeDBAdapter.addSurvivor(joeDoeSurvivor),
    ]);

    await expect(flagSurvivorAsInfectedService.execute(
      joeDoeSurvivor.id,
      joeDoeTraitor.id,
    )).rejects.toBeInstanceOf(DomainError);
  });
});
