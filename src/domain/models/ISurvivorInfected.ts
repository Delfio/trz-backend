import { ISurvivor, SurvivorInfectedDTO } from '../index';

export interface ISurvivorInfected extends SurvivorInfectedDTO{
    survivor_infected_date: Date;
    infected_survivor?: ISurvivor;
    reporter_survivor?: ISurvivor;
}
