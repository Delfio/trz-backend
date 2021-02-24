import { getRepository, Repository } from 'typeorm';
import { IInventory, ITraderProfile } from '../../../domain';
import { IInventoryAdapter } from '../../../adapters';
import { SurvivorInventoryEntity } from '../entities';
import DomainErro from '../../validations/DomainErro';

export class InventoryRepository implements IInventoryAdapter {
    private inventoryRepository: Repository<SurvivorInventoryEntity>

    constructor() {
      this.inventoryRepository = getRepository(SurvivorInventoryEntity);
    }

    async addItemToSurvivorInventory(inventory: IInventory): Promise<void> {
      const newItem = this.inventoryRepository.create(inventory);

      await this.inventoryRepository.save(newItem);
    }

    async getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]> {
      return this.inventoryRepository.find({
        where: {
          survivor_id,
        },
      });
    }

    async findItemIntoSurvivorInventory(
      survivor_id: string, item_id: string,
    ): Promise<IInventory | undefined> {
      return this.inventoryRepository.findOne({
        where: {
          survivor_id,
          item_id,
        },
      });
    }

    async exchangeBetweenTwoSurvivors(
      trader01: ITraderProfile,
      trader02: ITraderProfile,
    ): Promise<void> {
      await this.inventoryRepository.manager.transaction<void>(
        async (transacationManager) => {
          let totalPointsOfItemsTraderN1 = 0;
          let totalPointsOfItemsTraderN2 = 0;
          const ItemsForTraderN1 = await Promise.all(
            trader01.item.map((item) => transacationManager.findOne(SurvivorInventoryEntity, {
              where: {
                item_id: item.item_id,
              },
            })),
          );

          const ItemsForTraderN2 = await Promise.all(
            trader02.item.map((item) => transacationManager.findOne(SurvivorInventoryEntity, {
              where: {
                item_id: item.item_id,
              },
            })),
          );

          for (const item of ItemsForTraderN1) {
            if (!item) throw new DomainErro('One or more items reported by merchant 1º do not match the list of items registered in your inventory');

            let receiverContainsThisItemRegisteredInYourInventory = await
            transacationManager.findOne(SurvivorInventoryEntity, {
              where: {
                item_id: item.item_id,
                survivor_id: trader02.profile.id,
              },
            });

            if (receiverContainsThisItemRegisteredInYourInventory) {
              receiverContainsThisItemRegisteredInYourInventory.amount += item.amount;
            } else {
              receiverContainsThisItemRegisteredInYourInventory = transacationManager
                .create(SurvivorInventoryEntity, {
                  amount: item.amount,
                  item_id: item.item_id,
                  survivor_id: trader02.profile.id,
                });
            }

            const inventoryOfTheInitialOwnerOfTheItem = await
            transacationManager.findOne(SurvivorInventoryEntity, {
              where: {
                item_id: item.item_id,
                survivor_id: trader01.profile.id,
              },
            });

            if (!inventoryOfTheInitialOwnerOfTheItem) throw new DomainErro('Dealer N1 does not have the item sold in your inventory!');

            inventoryOfTheInitialOwnerOfTheItem.amount -= item.amount;
            totalPointsOfItemsTraderN1 += item.item.item_points;

            await Promise.all([
              await transacationManager.update(SurvivorInventoryEntity,
                {
                  item_id: inventoryOfTheInitialOwnerOfTheItem.item_id,
                  survivor_id: trader01.profile.id,
                }, {
                  amount: inventoryOfTheInitialOwnerOfTheItem.amount,
                }),
              await transacationManager.update(SurvivorInventoryEntity,
                {
                  item_id: receiverContainsThisItemRegisteredInYourInventory.item_id,
                  survivor_id: trader02.profile.id,
                }, {
                  amount: receiverContainsThisItemRegisteredInYourInventory.amount,
                }),
            ]);
          }

          for (const item of ItemsForTraderN2) {
            if (!item) throw new DomainErro('One or more items reported by merchant 2º do not match the list of items registered in your inventory');

            let receiverContainsThisItemRegisteredInYourInventory = await
            transacationManager.findOne(SurvivorInventoryEntity, {
              where: {
                item_id: item.item_id,
                survivor_id: trader01.profile.id,
              },
            });

            if (receiverContainsThisItemRegisteredInYourInventory) {
              receiverContainsThisItemRegisteredInYourInventory.amount += item.amount;
            } else {
              receiverContainsThisItemRegisteredInYourInventory = transacationManager
                .create(SurvivorInventoryEntity, {
                  amount: item.amount,
                  item_id: item.item_id,
                  survivor_id: trader01.profile.id,
                });
            }

            const inventoryOfTheInitialOwnerOfTheItem = await
            transacationManager.findOne(SurvivorInventoryEntity, {
              where: {
                item_id: item.item_id,
                survivor_id: trader02.profile.id,
              },
            });

            if (!inventoryOfTheInitialOwnerOfTheItem) throw new DomainErro('Dealer N2 does not have the item sold in your inventory!');

            inventoryOfTheInitialOwnerOfTheItem.amount -= item.amount;
            totalPointsOfItemsTraderN2 += item.item.item_points;

            await Promise.all([
              await transacationManager.update(SurvivorInventoryEntity,
                {
                  item_id: inventoryOfTheInitialOwnerOfTheItem.item_id,
                  survivor_id: trader02.profile.id,
                }, {
                  amount: inventoryOfTheInitialOwnerOfTheItem.amount,
                }),
              await transacationManager.update(SurvivorInventoryEntity,
                {
                  item_id: receiverContainsThisItemRegisteredInYourInventory.item_id,
                  survivor_id: trader01.profile.id,
                }, {
                  amount: receiverContainsThisItemRegisteredInYourInventory.amount,
                }),
            ]);
          }

          if (totalPointsOfItemsTraderN1 !== totalPointsOfItemsTraderN2) {
            throw new DomainErro('The points to make the exchange, do not match!');
          }
        },
      );
    }
}
