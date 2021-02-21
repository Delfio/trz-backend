import { v1 } from 'uuid';
import faker from 'faker';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import GetItemOfSurvivorInventory from '../../services/GetItemOfSurvivorInventory';
import utils from '../utils';

const { JoeDoeSurvivor, generateRandonInitialItems } = utils;
let inventoryFakeDBAdapter: InventoryFakeDBAdapter;
let itemFakeDBAdapter: ItemFakeDBAdapter;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;
let getItemOfSurvivorInventory: GetItemOfSurvivorInventory;

describe('tests responsible for validating access to an item in a survivor inventory', () => {
  beforeEach(() => {
    inventoryFakeDBAdapter = new InventoryFakeDBAdapter();
    itemFakeDBAdapter = new ItemFakeDBAdapter();
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    getItemOfSurvivorInventory = new GetItemOfSurvivorInventory(
      inventoryFakeDBAdapter,
      itemFakeDBAdapter,
      suvivorFakeDBAdapter,
    );
  });

  async function GenerateInitialData(length: number) {
    const randomItems = generateRandonInitialItems(length);

    await Promise.all(randomItems
      .map((item) => itemFakeDBAdapter.addItem(item)));

    return randomItems;
  }
  it('survivor should be able to get one item of your inventory', async () => {
    expect.hasAssertions();

    const totalItemsLength = 10;

    const [[itemsGenerated], joeDoe] = await Promise.all([
      GenerateInitialData(totalItemsLength),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
    ]);

    await inventoryFakeDBAdapter.addItemToSurvivorInventory(
      itemsGenerated,
      joeDoe,
      faker.random.number(5),
    );

    const item = await getItemOfSurvivorInventory.execute(joeDoe.id, itemsGenerated.item_id);

    expect(item.item).toStrictEqual(itemsGenerated);
  });

  it.todo('should not be able to access inventory of survivor not registered');
  it.todo('should not be able to access inventory of infected survivor');
  it.todo('should not be able to access of item if item not registered into inventory of this survivor');
});
