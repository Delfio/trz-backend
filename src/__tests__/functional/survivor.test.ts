import { v1 } from 'uuid';
import faker from 'faker';
import * as Yup from 'yup';
import AppError from '../../main/usecase/AppError';
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

  const generateRandonInitialItems = async (length: number) => {
    const totalItems = Array.from({
      length,
    }, (_, index) => index);

    const startingItemsInformation = totalItems.map((points) => ({
      item_description: faker.lorem.lines(2),
      item_id: v1(),
      item_points: points,
    }));

    const InitialItemsOfTest = startingItemsInformation
      .map((item) => itemFakeDBAdapter.addItem(item));

    await Promise.all(InitialItemsOfTest);

    return startingItemsInformation;
  };

  it('should it will be possible to register a survivor with some default items', async () => {
    expect.hasAssertions();

    const [startingItemsInformation] = await generateRandonInitialItems(5);

    const baseInformations: AddSurvivorWithInitialBasicItems = {
      initialInventory: [{
        item_id: startingItemsInformation.item_id,
        amount: 1,
      }],
      survivor: JoeDoeSurvivor(v1()),
    };
    const survivor = await survivorController.store(baseInformations);

    expect(survivor).not.toBeUndefined();
    expect(survivor).not.toBeNull();
    expect(survivor.id).not.toBeUndefined();
  });

  it('should not be able to register a survivor with no basic informations', async () => {
    expect.hasAssertions();
    const [startingItemsInformation] = await generateRandonInitialItems(5);

    const baseInformations: AddSurvivorWithInitialBasicItems = {
      initialInventory: [{
        item_id: startingItemsInformation.item_id,
        amount: 1,
      }],
      survivor: {
        age: 0,
        lastLocation: {
          latitude: 0,
          longitude: 0,
        },
        name: '',
      },
    };

    await expect(survivorController.store(baseInformations))
      .rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return all survivors', async () => {
    expect.hasAssertions();

    const totalOfRegistredSurvivors = 10;

    const totalSurvivors = Array.from({
      length: totalOfRegistredSurvivors,
    }, (_, index) => index);

    const registerSurvivors = totalSurvivors.map((_) => suvivorFakeDBAdapter.addSurvivor({
      ...JoeDoeSurvivor(v1()),
      name: faker.name.firstName(),
      lastLocation: {
        latitude: Number(faker.address.latitude()),
        longitude: Number(faker.address.longitude()),
      },
    }));

    await Promise.all(registerSurvivors);

    const allSurvivors = await survivorController.index();

    expect(allSurvivors).toHaveLength(totalOfRegistredSurvivors);
  });
});
