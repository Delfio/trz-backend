import { v1 } from 'uuid';
import AddItemsToTheSurvivorInventory from '../../services/AddItemsToTheSurvivorInventory';
import SuvivorFakeDBAdapter from '../mocks/survivorAdapter/SuvivorFakeDBAdapter';
import { InventoryDTO, ISurvivor } from '../../domain';

let addItemsToTheSurvivorInventory: AddItemsToTheSurvivorInventory;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;

describe('tests responsible for validating business rule related to adding items to the survivor inventory', () => {
  beforeEach(() => {
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    addItemsToTheSurvivorInventory = new AddItemsToTheSurvivorInventory(suvivorFakeDBAdapter);
  });

  const JoeDoeSurvivor = (id: string): ISurvivor => ({
    age: 19,
    id,
    infected: false,
    lastLocation: {
      latitude: -55.5555,
      longitude: 55.5555,
    },
    name: 'Joe Doe',
  });

  it('must be possible to insert items into a survivor inventory', async () => {
    expect.hasAssertions();

    const newSurvivor = await suvivorFakeDBAdapter.addSurvivor({
      ...JoeDoeSurvivor(v1()),
    });

    const inventoryDTO: InventoryDTO = {
      amount: 5,
      item_id: 'aaa-bbb-ccc-ddd',
      survivor_id: newSurvivor.id,
    };
    const items = await addItemsToTheSurvivorInventory.execute(inventoryDTO);

    expect(items).not.toBeUndefined();
    expect(items).toStrictEqual(inventoryDTO);
  });

  it('i hope that it is not possible to add an item to the inventory of a survivor that does not exist', async () => {
    expect.hasAssertions();

    const inventoryDTO: InventoryDTO = {
      amount: 5,
      item_id: 'aaa-bbb-ccc-ddd',
      survivor_id: 'aaa-cccc-ddd-eee',
    };

    await expect(addItemsToTheSurvivorInventory.execute(inventoryDTO))
      .rejects.toBeInstanceOf(Error);
  });
});
