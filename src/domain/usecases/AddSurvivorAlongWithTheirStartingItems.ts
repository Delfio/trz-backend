import { RegisterSurvivorWithStartingItemsDTO, ISurvivor } from '..';

export interface AddSurvivorAlongWithTheirStartingItems {
    execute(data: RegisterSurvivorWithStartingItemsDTO): Promise<ISurvivor>
}
