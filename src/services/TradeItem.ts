import { TradeItem, INegotiation } from '../domain';
import {
  IInventoryAdapter,
  IItemAdapter,
  ISurvivorsAdapter,
} from '../adapters';

import DomainErros from '../usecases/validations/DomainErro';

class TradeItemService implements TradeItem {
  constructor(
    private inventoryAdapter: IInventoryAdapter,
    private itemAdapter: IItemAdapter,
    private survivorsAdapter: ISurvivorsAdapter,
  ) {}

  async execute(data: INegotiation): Promise<void> {
    let totalPointsOfTraderN1 = 0;
    let totalPointsOfTraderN2 = 0;

    const {
      info_survivor_trader_n1,
      info_survivor_trader_n2,
    } = data;

    const [
      traderN1,
      traderN2,
    ] = await Promise.all([
      this.survivorsAdapter.getSurvivor(info_survivor_trader_n1.profile.id),
      this.survivorsAdapter.getSurvivor(info_survivor_trader_n2.profile.id),
    ]);

    (() => {
      if (!traderN1) {
        throw new DomainErros('Error in negotiation, trader01 not found in system!');
      }

      if (traderN1.infected) {
        throw new DomainErros(`Error in negotiation, ${traderN1.name} is traitor!`);
      }

      if (!traderN2) {
        throw new DomainErros('Error in negotiation, trader02 not found in system!');
      }

      if (traderN2.infected) {
        throw new DomainErros(`Error in negotiation, ${traderN2.name} is traitor!`);
      }
    })();

    for (const itemTraderN1 of info_survivor_trader_n1.item) {
      const itemValid = await this.itemAdapter.getItemById(itemTraderN1.item_id);
      const inventoryValid = await this.inventoryAdapter
        .findItemIntoSurvivorInventory(traderN1.id, itemTraderN1.item_id);

      if (!itemValid) {
        throw new DomainErros(`Error in negotiation. [${traderN1.name}]:  reported an item that does not exist!`);
      }
      if (!inventoryValid || inventoryValid.amount < itemTraderN1.amount) {
        throw new DomainErros(`Error in negotiation. [${traderN1.name}]:  do not contain this item in the inventory!`);
      }

      totalPointsOfTraderN1 += (itemTraderN1.amount * itemValid.item_points);
    }

    for (const itemTraderN2 of info_survivor_trader_n2.item) {
      const itemValid = await this.itemAdapter.getItemById(itemTraderN2.item_id);
      const inventoryValid = await this.inventoryAdapter
        .findItemIntoSurvivorInventory(traderN2.id, itemTraderN2.item_id);

      if (!itemValid) {
        throw new DomainErros(`Error in negotiation. [${traderN2.name}]:  reported an item that does not exist!`);
      }
      if (!inventoryValid || inventoryValid.amount < itemTraderN2.amount) {
        throw new DomainErros(`Error in negotiation. [${traderN2.name}]:  do not contain this item in the inventory!`);
      }

      totalPointsOfTraderN2 += (itemTraderN2.amount * itemValid.item_points);
    }

    if (totalPointsOfTraderN1 !== totalPointsOfTraderN2) {
      throw new DomainErros('Both sides of the trade should offer the same amount of points');
    }

    return this.inventoryAdapter.exchangeBetweenTwoSurvivors(
      info_survivor_trader_n1,
      info_survivor_trader_n2,
    );
  }
}

export default TradeItemService;
