import { v1 } from 'uuid';
import RegisterNewSurvivor from '../../services/AddSurvivorAlongWithTheirStartingItems';
import SurvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import { RegisterSurvivorWithStartingItemsDTO } from '../../domain';
import util from '../utils';

const { JoeDoeSurvivor, generateRandonInitialItems } = util;
let registerNewSurvivor: RegisterNewSurvivor;
let inventoryFakeDBAdapter: InventoryFakeDBAdapter;
let itemFakeDBAdapter: ItemFakeDBAdapter;
let survivorFakeDBAdapter: SurvivorFakeDBAdapter;

describe('tests responsible for validating business rules aimed at the survivor', () => {
  beforeEach(() => {
    inventoryFakeDBAdapter = new InventoryFakeDBAdapter();
    itemFakeDBAdapter = new ItemFakeDBAdapter();
    survivorFakeDBAdapter = new SurvivorFakeDBAdapter();
    registerNewSurvivor = new RegisterNewSurvivor(
      survivorFakeDBAdapter,
      itemFakeDBAdapter,
      inventoryFakeDBAdapter,
    );
  });

  function defaultSurvivor() {
    return {
      name: 'Joeh Doe',
      age: 19,
      lastLocation: {
        latitude: -55.5555,
        longitude: 55.5555,
      },
    };
  }

  it('expected it is possible to register a survivor contains name, age, gender and last location (latitude, longitude)', async () => {
    expect.hasAssertions();

    const totalItemsInTheSystem = 10;
    const totalItemsInJoeInventory = 5;

    const items = generateRandonInitialItems(totalItemsInTheSystem);

    await Promise
      .all(items.map((item) => itemFakeDBAdapter.addItem(item)));

    const itemsOfSurvivor = Array.from({
      length: totalItemsInJoeInventory,
    }, (_, index) => index).map((index) => {
      const item = items[index];
      return {
        amount: 5,
        item_id: item.item_id,
      };
    });

    const survivo: RegisterSurvivorWithStartingItemsDTO = {
      initialInventory: itemsOfSurvivor,
      survivor: defaultSurvivor(),
    };

    const survivorRegistred = await registerNewSurvivor.execute(survivo);

    expect(survivorRegistred).not.toBeUndefined();
    expect(survivorRegistred.id).not.toBeUndefined();
    expect(survivorRegistred.suvivor_inventory)
      .toHaveLength(totalItemsInJoeInventory);

    survivorRegistred.suvivor_inventory!.forEach((itemOfJoe) => {
      expect(itemsOfSurvivor
        .find((initialItem) => initialItem.item_id === itemOfJoe.item_id)).not.toBeUndefined();
    });
  });
});
