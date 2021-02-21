import { ISurvivor } from '../../domain';
import { ISurvivorsAdapter, IItemAdapter, IInventoryAdapter } from '../../adapters';
import AddSurvivor from '../../services/AddSurvivor';
import AddItemsToTheSurvivorInventory from '../../services/AddItemsToTheSurvivorInventory';
import GetItemByID from '../../services/GetItemByID';
import { AddSurvivorWithInitialBasicItems } from '../adapters/AddSurvivorWithInitialBasicItems';

export class SurvivorController {
  constructor(
      private survivorsAdapter: ISurvivorsAdapter,
      private itemAdapter: IItemAdapter,
      private inventoryAdapter: IInventoryAdapter,
  ) {}

  async index(): Promise<ISurvivor[]> {
    return this.survivorsAdapter.getAllSurvivors();
  }

  async store(data: AddSurvivorWithInitialBasicItems): Promise<ISurvivor> {
    // TODO --- Validations.
    const { initialInventory, survivor } = data;

    const addSurvivorService = new AddSurvivor(this.survivorsAdapter);
    const getItemByID = new GetItemByID(this.itemAdapter);

    const addItemsToTheSurvivorInventory = new AddItemsToTheSurvivorInventory(
      this.survivorsAdapter,
      getItemByID,
      this.inventoryAdapter,
    );

    const newSurvivor = await addSurvivorService.execute(survivor);

    const survivorInventory = initialInventory.map(
      (item) => addItemsToTheSurvivorInventory.execute({
        ...item,
        survivor_id: newSurvivor.id,
      }),
    );

    const inventory = await Promise.all(survivorInventory);

    return {
      ...newSurvivor,
      suvivor_inventory: inventory,
    };
  }
}
