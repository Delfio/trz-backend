import { v4 } from 'uuid';
import {
  AddSurvivorAlongWithTheirStartingItems, ISurvivor, RegisterSurvivorWithStartingItemsDTO, IItem,
} from '../domain';
import { ISurvivorsAdapter, IItemAdapter, IInventoryAdapter } from '../adapters';
import DomainError from '../usecases/validations/DomainErro';

class AddSurvivorAlongWithTheirStartingItemsService
implements AddSurvivorAlongWithTheirStartingItems {
  constructor(
      private survivorAdapter: ISurvivorsAdapter,
      private itemAdapter: IItemAdapter,
      private inventoryAdapter: IInventoryAdapter,
  ) {}

  async execute(data: RegisterSurvivorWithStartingItemsDTO): Promise<ISurvivor> {
    const {
      initialInventory,
      survivor,
    } = data;

    const itensExists = await Promise.all(
      initialInventory.map((item) => this.itemAdapter.getItemById(item.item_id)),
    );

    itensExists.forEach((item) => {
      if (!item) {
        throw new DomainError('Item not registered!');
      }
    });

    const newSurvivor = await this.survivorAdapter.addSurvivor({
      ...survivor,
      infected: false,
      id: v4(),
    });

    await Promise.all(initialInventory.map(
      (item) => this.inventoryAdapter
        .addItemToSurvivorInventory({
          ...item,
          survivor_id: newSurvivor.id,
        }),
    ));

    const newSurvivorInventory = await this.inventoryAdapter
      .getAllItensIntoSurvivorInventory(newSurvivor.id);

    return {
      ...newSurvivor,
      suvivor_inventory: newSurvivorInventory,
    };
  }
}

export default AddSurvivorAlongWithTheirStartingItemsService;
