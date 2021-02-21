import { IInventoryAdapter } from '../../adapters';
import { IInventory, ITraderProfile } from '../../domain';

class IInventoryFakeDBAdapter implements IInventoryAdapter {
    private listOfInventory: IInventory[] = [];

    async addItemToSurvivorInventory(inventory: IInventory): Promise<void> {
      this.listOfInventory.push(inventory);
    }

    async getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]> {
      return this.listOfInventory.filter(
        (inventory) => inventory.survivor_id === survivor_id && inventory.amount > 0,
      );
    }

    async findItemIntoSurvivorInventory(
      survivor_id: string, item_id: string,
    ): Promise<IInventory | undefined> {
      return this.listOfInventory.find(
        (inventory) => inventory.item_id === item_id
        && inventory.survivor_id === survivor_id
        && inventory.amount > 0,
      );
    }

    async exchangeBetweenTwoSurvivors(
      trader01: ITraderProfile,
      trader02: ITraderProfile,
    ): Promise<void> {
      const traderN1Profile = trader01.profile;
      const traderN2Profile = trader02.profile;

      // Trade1 -> Trade2
      for (const itemOfTrade of trader01.item) {
        const indexOfPropertie = this.listOfInventory.findIndex(
          (item) => item.survivor_id === traderN1Profile.id
          && item.item_id === itemOfTrade.item_id,
        );

        let indexOfReciver = this.listOfInventory.findIndex(
          (item) => item.survivor_id === traderN2Profile.id
            && item.item_id === itemOfTrade.item_id,
        );

        if (indexOfReciver < 0) {
          const newItem = this.listOfInventory[indexOfPropertie];

          if (newItem) {
            this.listOfInventory.push({
              ...newItem,
              amount: 0,
              survivor_id: traderN2Profile.id,
            });

            indexOfReciver = this.listOfInventory.findIndex(
              (item) => item.survivor_id === traderN2Profile.id
                  && item.item_id === itemOfTrade.item_id,
            );
          }
        }

        this.listOfInventory[indexOfPropertie].amount -= itemOfTrade.amount;
        this.listOfInventory[indexOfReciver].amount += itemOfTrade.amount;
      }

      // Trade2 -> Trade1
      for (const itemOfTrade of trader02.item) {
        const indexOfPropertie = this.listOfInventory.findIndex(
          (item) => item.survivor_id === traderN2Profile.id
          && item.item_id === itemOfTrade.item_id,
        );

        let indexOfReciver = this.listOfInventory.findIndex(
          (item) => item.survivor_id === traderN1Profile.id
            && item.item_id === itemOfTrade.item_id,
        );

        if (indexOfReciver < 0) {
          const newItem = this.listOfInventory[indexOfPropertie];

          if (newItem) {
            this.listOfInventory.push({
              ...newItem,
              amount: 0,
              survivor_id: traderN1Profile.id,
            });

            indexOfReciver = this.listOfInventory.findIndex(
              (item) => item.survivor_id === traderN1Profile.id
                  && item.item_id === itemOfTrade.item_id,
            );
          }
        }

        this.listOfInventory[indexOfPropertie].amount -= itemOfTrade.amount;
        this.listOfInventory[indexOfReciver].amount += itemOfTrade.amount;
      }
    }
}

export default IInventoryFakeDBAdapter;
