import { v1 } from 'uuid';
import {
  IInventory, IItem, INegotiation, ISurvivor,
} from '../../domain';
import InventoryFakeDBAdapter from '../mocks/InventoryFakeDBAdapter';
import ItemFakeDBAdapter from '../mocks/ItemFakeDBAdapter';
import SuvivorFakeDBAdapter from '../mocks/SuvivorFakeDBAdapter';
import TradeItemService from '../../services/TradeItem';
import utils from '../utils';
import DomainErro from '../../usecases/validations/DomainErro';

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

  it('in an exchange, all survivors must be registered', async () => {
    expect.hasAssertions();

    const JoeDoeTraderN1 = JoeDoeSurvivor(v1());
    const DoeJoeTraderN2 = JoeDoeSurvivor(v1());

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

    await expect(tradeItemService.execute(negociation))
      .rejects.toBeInstanceOf(DomainErro);

    await suvivorFakeDBAdapter.addSurvivor(JoeDoeTraderN1);

    await expect(tradeItemService.execute(negociation))
      .rejects.toBeInstanceOf(DomainErro);
  });

  it('only uninfected survivors can make exchanges', async () => {
    expect.hasAssertions();

    const [JoeDoeTraderInfectedN1, DoeJoeTraderN2] = await Promise.all([
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        name: 'Joe Doe Trader N1',
        infected: true,
      }),
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        name: 'Doe Joe Trader N2',
      }),
    ]);

    function negocition(traderN1: ISurvivor, traderN2: ISurvivor) {
      const [itemTraderN1, itemTraderN2]: IItem[] = [
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

      const negociation: INegotiation = {
        info_survivor_trader_n1: {
          item: [{
            item_id: itemTraderN1.item_id,
            amount: 5,
          }],
          profile: traderN1,
        },
        info_survivor_trader_n2: {
          item: [{
            item_id: itemTraderN2.item_id,
            amount: 5,
          }],
          profile: traderN2,
        },
      };
      return negociation;
    }

    let objNegocition = await negocition(JoeDoeTraderInfectedN1, DoeJoeTraderN2);
    await expect(tradeItemService.execute(objNegocition))
      .rejects.toBeInstanceOf(DomainErro);

    const [JoeDoeTraderN1, DoeJoeTraderInfectedN2] = await Promise.all([
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        name: 'Joe Doe Trader N1',
      }),
      suvivorFakeDBAdapter.addSurvivor({
        ...JoeDoeSurvivor(v1()),
        name: 'Doe Joe Trader N2',
        infected: true,
      }),
    ]);

    objNegocition = await negocition(JoeDoeTraderN1, DoeJoeTraderInfectedN2);

    await expect(tradeItemService.execute(objNegocition))
      .rejects.toBeInstanceOf(DomainErro);
  });

  it('an exchange cannot be completed if an item is reported that does not exist', async () => {
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

    await expect(tradeItemService.execute(negociation))
      .rejects.toBeInstanceOf(DomainErro);

    await itemFakeDBAdapter.addItem(itemOfJoeDoeTraderN1);

    negociation.info_survivor_trader_n1.item[0].amount = 10;
    await expect(tradeItemService.execute(negociation))
      .rejects.toBeInstanceOf(DomainErro);

    negociation.info_survivor_trader_n1.item[0].amount = 2;
    await expect(tradeItemService.execute(negociation))
      .rejects.toBeInstanceOf(DomainErro);
  });

  it.todo('for an exchange to take place, it is necessary that both sides (traderN1 and traderN2) have the same points');
});
