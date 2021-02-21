import { v1 } from 'uuid';
import faker from 'faker';
import { SurvivorController } from '../../main/controllers/SurvivorController';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import { AddSurvivorWithInitialBasicItems } from '../../main/adapters/AddSurvivorWithInitialBasicItems';
import utils from '../utils';

const { JoeDoeSurvivor } = utils;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;
let survivorController: SurvivorController;
let inventoryFakeDBAdapter: InventoryFakeDBAdapter;
let itemFakeDBAdapter: ItemFakeDBAdapter;

describe('tests responsible for validating the entire survivor rule', () => {
  beforeEach(() => {
    inventoryFakeDBAdapter = new InventoryFakeDBAdapter();
    itemFakeDBAdapter = new ItemFakeDBAdapter();
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    survivorController = new SurvivorController(
      suvivorFakeDBAdapter,
      itemFakeDBAdapter,
      inventoryFakeDBAdapter,
    );
  });

  it('should it will be possible to register a survivor with some default items', async () => {
    expect.hasAssertions();

    const totalItems = Array.from({
      length: 5,
    }, (_, index) => index);

    const startingItemsInformation = totalItems.map((points) => ({
      item_description: faker.lorem.lines(2),
      item_id: v1(),
      item_points: points,
    }));

    const InitialItemsOfTest = startingItemsInformation
      .map((item) => itemFakeDBAdapter.addItem(item));

    await Promise.all(InitialItemsOfTest);

    const baseInformations: AddSurvivorWithInitialBasicItems = {
      initialInventory: [{
        item_id: startingItemsInformation[0].item_id,
        amount: 1,
      }],
      survivor: JoeDoeSurvivor(v1()),
    };
    const survivor = await survivorController.store(baseInformations);

    expect(survivor).not.toBeUndefined();
    expect(survivor).not.toBeNull();
    expect(survivor.id).not.toBeUndefined();
  });

  it.todo('I hope it is not possible to register a survivor with no basic informations');
});
