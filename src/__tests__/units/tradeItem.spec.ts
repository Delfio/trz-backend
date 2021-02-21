import { v1 } from 'uuid';
import {
  IInventory, IItem, INegotiation,
} from '../../domain';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import TradeItemService from '../../services/TradeItem';
import utils from '../utils';

const {
  JoeDoeSurvivor,
} = utils;
let inventoryFakeDBAdapter: InventoryFakeDBAdapter;
let itemFakeDBAdapter: ItemFakeDBAdapter;
let suvivorFakeDBAdapter: SuvivorFakeDBAdapter;
let tradeItemService: TradeItemService;

describe('validation of rules related to negotiations', () => {
  beforeEach(() => {
    inventoryFakeDBAdapter = new InventoryFakeDBAdapter();
    itemFakeDBAdapter = new ItemFakeDBAdapter();
    suvivorFakeDBAdapter = new SuvivorFakeDBAdapter();
    tradeItemService = new TradeItemService(
      inventoryFakeDBAdapter,
      itemFakeDBAdapter,
      suvivorFakeDBAdapter,
    );
  });

  it('two survivors should be able to effect one trade', async () => {
    expect.hasAssertions();

    const [JoeDoeTraderN1, DoeJoeTraderN2] = await Promise.all([
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        name: 'Joe Doe Trader N1',
      }),
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        name: 'Doe Joe Trader N2',
      }),
    ]);

    const [itemOfJoeDoeTraderN1, itemOfDoeJoeTraderN2]: IItem[] = [
      {
        item_amount_total: 5,
        item_description: 'item to validate trading rule',
        item_id: 'item-of-trader-n1',
        item_points: 5,
      },
      {
        item_amount_total: 5,
        item_description: 'item to validate trading rule 2',
        item_id: 'item-of-trader-n2',
        item_points: 5,
      },
    ];

    await Promise.all([
      itemFakeDBAdapter.addItem(itemOfJoeDoeTraderN1),
      itemFakeDBAdapter.addItem(itemOfDoeJoeTraderN2),
    ]);

    await inventoryFakeDBAdapter.addItemToSurvivorInventory({
      ...itemOfJoeDoeTraderN1,
      amount: 5,
      survivor_id: JoeDoeTraderN1.id,
    });

    await inventoryFakeDBAdapter.addItemToSurvivorInventory({
      ...itemOfDoeJoeTraderN2,
      amount: 5,
      survivor_id: DoeJoeTraderN2.id,
    });

    const negociation: INegotiation = {
      info_survivor_trader_n1: {
        item: [{
          item_id: itemOfJoeDoeTraderN1.item_id,
          amount: 5,
        }],
        profile: JoeDoeTraderN1,
      },
      info_survivor_trader_n2: {
        item: [{
          item_id: itemOfDoeJoeTraderN2.item_id,
          amount: 5,
        }],
        profile: DoeJoeTraderN2,
      },
    };

    await tradeItemService.execute(negociation);

    const item = await inventoryFakeDBAdapter
      .getAllItensIntoSurvivorInventory(JoeDoeTraderN1.id);

    const newInventoryOfJoeDoe: IInventory[] = [{
      ...itemOfDoeJoeTraderN2,
      amount: 5,
      survivor_id: JoeDoeTraderN1.id,
    }];

    expect(item).toStrictEqual(newInventoryOfJoeDoe);
  });

  it.todo('a transaction cannot be completed if any of the merchants does not contain the items they are exchanging');
});
