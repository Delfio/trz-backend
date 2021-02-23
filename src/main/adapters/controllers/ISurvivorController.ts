import { ISurvivor, RegisterSurvivorWithStartingItemsDTO } from '../../../domain';
import { ISurvivorsAdapter, IItemAdapter, IInventoryAdapter } from '../../../adapters';

export abstract class ISurvivorController {
  constructor(
        protected survivorsAdapter: ISurvivorsAdapter,
        protected itemAdapter: IItemAdapter,
        protected inventoryAdapter: IInventoryAdapter,
  ) {}

  abstract index(): Promise<ISurvivor[]>;

  abstract store(data: RegisterSurvivorWithStartingItemsDTO): Promise<ISurvivor>

  abstract show(survivor_id: string): Promise<ISurvivor | undefined>
}
