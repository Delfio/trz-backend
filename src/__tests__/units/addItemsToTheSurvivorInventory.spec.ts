import AddItemsToTheSurvivorInventory from '../../services/AddItemsToTheSurvivorInventory';
import { InventoryDTO } from '../../domain';

let addItemsToTheSurvivorInventory: AddItemsToTheSurvivorInventory;

describe('tests responsible for validating business rule related to adding items to the survivor inventory', () => {
  beforeEach(() => {
    addItemsToTheSurvivorInventory = new AddItemsToTheSurvivorInventory();
  });

  it('must be possible to insert items into a survivor inventory', async () => {
    expect.hasAssertions();

    const inventoryDTO: InventoryDTO = {
      amount: 5,
      item_id: 'aaa-bbb-ccc-ddd',
      survivor_id: 'aaa-cccc-ddd-eee',
    };
    const items = await addItemsToTheSurvivorInventory.execute(inventoryDTO);

    expect(items).not.toBeUndefined();
    expect(items).toStrictEqual(inventoryDTO);
  });
});
