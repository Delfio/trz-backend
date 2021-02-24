import { CreateTheFullReport, IResultOfReport } from '../domain';
import { IInventoryAdapter, IItemAdapter, ISurvivorsAdapter } from '../adapters';

export default class CreateTheFullReportService implements CreateTheFullReport {
  constructor(
    private inventoryAdapter : IInventoryAdapter,
    private itemAdapter : IItemAdapter,
    private survivorsAdapter : ISurvivorsAdapter,
  ) {}

  async execute(): Promise<IResultOfReport> {
    const [allSurvivors, infectedSurvivors, allItems] = await Promise.all([
      this.survivorsAdapter.getAllSurvivors(),
      this.survivorsAdapter.getAllSurvivorInfected(),
      this.itemAdapter.getAllItens(),
    ]);

    const result: IResultOfReport = {
      average_amount_of_resource_by_survivor: [],
      percentage_of_infected_survivors: 0,
      percentage_of_non_infected_survivors: 0,
      points_lost_because_of_an_infected_survivor: 0,
    };

    const totalNumberOfRegisteredSurvivors = allSurvivors.length;

    const percentage_of_infected_survivors = (
      Math.round((infectedSurvivors.length * 100) / allSurvivors.length));

    result
      .percentage_of_non_infected_survivors = Math.round((100 - percentage_of_infected_survivors));

    result.percentage_of_infected_survivors = percentage_of_infected_survivors;

    for await (const item of allItems) {
      const allInventoryAssociatedWithThatItem = await Promise.all(allSurvivors.map(
        (survivor) => this.inventoryAdapter
          .findItemIntoSurvivorInventory(survivor.id, item.item_id),
      ));

      const totalAmount = allInventoryAssociatedWithThatItem
        .filter((inventory) => !!inventory)
        .map((inventory) => inventory!.amount)
        .reduce((prev, curr) => (prev + curr), 0);

      result.average_amount_of_resource_by_survivor.push({
        average_by_survivor: Math.round((totalAmount / totalNumberOfRegisteredSurvivors)),
        item_description: item.item_description,
        item_id: item.item_id,
      });

      const allInventoriesOfInfectedSurvivorsWhoOwnTheItem = await Promise
        .all(infectedSurvivors.map(
          (infectedSurvivor) => this.inventoryAdapter
            .findItemIntoSurvivorInventory(infectedSurvivor.id, item.item_id),
        ));

      const totalPointsLost = allInventoriesOfInfectedSurvivorsWhoOwnTheItem
        .filter((inventory) => !!inventory)
        .map((inventory) => inventory!.amount)
        .reduce((prev, curr) => (prev + (curr * item.item_points)), 0);

      result
        .points_lost_because_of_an_infected_survivor += totalPointsLost;
    }

    return result;
  }
}
