import { v1 } from 'uuid';
import AddItemsToTheSurvivorInventory from '../../services/AddItemsToTheSurvivorInventory';
import GetItemByIDService from '../../services/GetItemByID';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import { IItem, InventoryDTO } from '../../domain';
import ultils from '../utils';
import DomainError from '../../usecases/validations/DomainErro';

const { JoeDoeSurvivor } = ultils;

let addItemsToTheSurvivorInventory: AddItemsToTheSurvivorInventory;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;
let getItemByIDService: GetItemByIDService;
let itemFakeDBAdapter: ItemFakeDBAdapter;
let inventoryFakeDBAdapter: InventoryFakeDBAdapter;

describe('tests responsible for validating business rule related to adding items to the survivor inventory', () => {
  beforeEach(() => {
    itemFakeDBAdapter = new ItemFakeDBAdapter();
    inventoryFakeDBAdapter = new InventoryFakeDBAdapter();
    getItemByIDService = new GetItemByIDService(itemFakeDBAdapter);
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    addItemsToTheSurvivorInventory = new AddItemsToTheSurvivorInventory(
      suvivorFakeDBAdapter,
      getItemByIDService,
      inventoryFakeDBAdapter,
    );
  });

  const standardItem = (id: string, points = 5): IItem => ({
    item_description: 'item standard',
    item_id: id,
    item_points: points,
  });

  it('must be possible to insert items into a survivor inventory', async () => {
    expect.hasAssertions();

    const FakeItem = standardItem(v1());

    await itemFakeDBAdapter.addItem(FakeItem);
    const newSurvivor = await suvivorFakeDBAdapter.addSurvivor({
      ...JoeDoeSurvivor(v1()),
    });

    const inventoryDTO: InventoryDTO = {
      amount: 5,
      item_id: FakeItem.item_id,
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
      survivor_id: 'survivor not exists',
    };

    await expect(addItemsToTheSurvivorInventory.execute(inventoryDTO))
      .rejects.toBeInstanceOf(DomainError);
  });

  it('should not be able to add item with in inventory if item not exists', async () => {
    expect.hasAssertions();

    const newSurvivor = await suvivorFakeDBAdapter.addSurvivor({
      ...JoeDoeSurvivor(v1()),
    });

    const inventoryDTO: InventoryDTO = {
      amount: 5,
      item_id: 'aaa-bbb-ccc-ddd',
      survivor_id: newSurvivor.id,
    };

    await expect(addItemsToTheSurvivorInventory.execute(inventoryDTO))
      .rejects.toBeInstanceOf(DomainError);
  });
});
