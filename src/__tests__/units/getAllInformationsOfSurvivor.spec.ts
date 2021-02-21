import { v1 } from 'uuid';
import faker from 'faker';
import GetAllInformationsOfSurvivor from '../../services/GetAllInformationsOfSurvivor';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import utils from '../utils';

const { generateRandonInitialItems, JoeDoeSurvivor } = utils;

let getAllInformationsOfSurvivor: GetAllInformationsOfSurvivor;
let inventoryFakeDBAdapter: InventoryFakeDBAdapter;
let itemFakeDBAdapter: ItemFakeDBAdapter;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;

describe('tests responsible for validating access to the inventory', () => {
  beforeEach(() => {
    inventoryFakeDBAdapter = new InventoryFakeDBAdapter();
    itemFakeDBAdapter = new ItemFakeDBAdapter();
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    getAllInformationsOfSurvivor = new GetAllInformationsOfSurvivor(
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
  it('must be possible to return the complete profile the survivor', async () => {
    expect.hasAssertions();

    const totalItensOfSurvivorInventoryLength = 5;
    const totalItemsLenght = 10;

    const totalItensOfSurvivorInventory = Array.from({
      length: totalItensOfSurvivorInventoryLength,
    }, (_, index) => index);

    const joeDoeSurvivor = JoeDoeSurvivor(v1());

    const randomItems = await GenerateInitialData(totalItemsLenght);
    await suvivorFakeDBAdapter.addSurvivor(joeDoeSurvivor);

    await Promise
      .all(totalItensOfSurvivorInventory
        .map((index) => inventoryFakeDBAdapter.addItemToSurvivorInventory(
          randomItems[index],
          joeDoeSurvivor,
          faker.random.number(4),
        )));

    const allItemsassignedToTheSurvivorInventory = await getAllInformationsOfSurvivor
      .execute(joeDoeSurvivor.id);

    expect(allItemsassignedToTheSurvivorInventory.suvivor_inventory)
      .toHaveLength(totalItensOfSurvivorInventoryLength);
  });

  it.todo('I hope an infected survivor does have access to your inventory');
});