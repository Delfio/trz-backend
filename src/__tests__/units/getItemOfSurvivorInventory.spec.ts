import { v1 } from 'uuid';
import faker from 'faker';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import SuvivorFakeDBAdapter from '../mocks/SurvivorFakeDBAdapter';
import GetItemOfSurvivorInventory from '../../services/GetItemOfSurvivorInventory';
import utils from '../utils';
import DomainErro from '../../usecases/validations/DomainErro';

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

    const recursiveGenerateRandomPositiveNumber = (ultimoId: number): number => {
      if (ultimoId <= 0) {
        return recursiveGenerateRandomPositiveNumber(faker.random.number(20));
      }
      return ultimoId;
    };

    await inventoryFakeDBAdapter.addItemToSurvivorInventory({
      ...itemsGenerated,
      amount: recursiveGenerateRandomPositiveNumber(faker.random.number(5)),
      survivor_id: joeDoe.id,
    });

    const item = await getItemOfSurvivorInventory.execute(joeDoe.id, itemsGenerated.item_id);

    expect(item.item).toStrictEqual(itemsGenerated);
  });

  it('should not be able to access inventory of survivor not registered', async () => {
    expect.hasAssertions();

    const joeDoeSurvivor = JoeDoeSurvivor(v1());

    const [[itemsGenerated]] = await Promise.all([
      GenerateInitialData(2),
    ]);

    await expect(getItemOfSurvivorInventory.execute(joeDoeSurvivor.id, itemsGenerated.item_id))
      .rejects.toBeInstanceOf(DomainErro);
  });

  it('should not be able to access inventory of infected survivor', async () => {
    expect.hasAssertions();

    const [[itemsGenerated], joeDoe] = await Promise.all([
      GenerateInitialData(5),
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        infected: true,
      }),
    ]);

    await inventoryFakeDBAdapter.addItemToSurvivorInventory({
      ...itemsGenerated,
      amount: faker.random.number(5),
      survivor_id: joeDoe.id,
    });

    await expect(getItemOfSurvivorInventory.execute(joeDoe.id, itemsGenerated.item_id))
      .rejects.toBeInstanceOf(DomainErro);
  });

  it('should not be able to access of item if item not registered into inventory of this survivor', async () => {
    expect.hasAssertions();

    const [[itemsGenerated], joeDoe] = await Promise.all([
      GenerateInitialData(5),
      suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1())),
    ]);

    await expect(getItemOfSurvivorInventory.execute(joeDoe.id, itemsGenerated.item_id))
      .rejects.toBeInstanceOf(DomainErro);
  });

  it('should not be able to access of item into survivor inventory if it not exists', async () => {
    expect.hasAssertions();

    const joeDoe = await suvivorFakeDBAdapter.addSurvivor(JoeDoeSurvivor(v1()));

    await expect(getItemOfSurvivorInventory.execute(joeDoe.id, 'item_does_exists_zzz'))
      .rejects.toBeInstanceOf(DomainErro);
  });
});
