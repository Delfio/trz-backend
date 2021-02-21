import * as Yup from 'yup';
import { ISurvivor } from '../../domain';
import { ISurvivorsAdapter, IItemAdapter, IInventoryAdapter } from '../../adapters';
import AddSurvivor from '../../services/AddSurvivor';
import AddItemsToTheSurvivorInventory from '../../services/AddItemsToTheSurvivorInventory';
import GetItemByID from '../../services/GetItemByID';
import { AddSurvivorWithInitialBasicItems } from '../adapters/AddSurvivorWithInitialBasicItems';
import AppError from '../usecase/AppError';

export class SurvivorController {
  constructor(
      private survivorsAdapter: ISurvivorsAdapter,
      private itemAdapter: IItemAdapter,
      private inventoryAdapter: IInventoryAdapter,
  ) {}

  async index(): Promise<ISurvivor[]> {
    return this.survivorsAdapter.getAllSurvivors();
  }

  async store(data: AddSurvivorWithInitialBasicItems): Promise<ISurvivor> {
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required('').min(4, 'i know we are into apocalypse, but use your real name'),
      age: Yup.number().required('').min(18, 'only older. Here we risk our lives, it not a scenario for children'),
      lastLocation: Yup.object().shape({
        latitude: Yup.number().required(''),
        longitude: Yup.number().required(''),
      }),
    });

    try {
      await schemaValidation.validate(data.survivor, {
        abortEarly: false,
      });

      const { initialInventory, survivor } = data;

      const addSurvivorService = new AddSurvivor(this.survivorsAdapter);
      const getItemByID = new GetItemByID(this.itemAdapter);

      const addItemsToTheSurvivorInventory = new AddItemsToTheSurvivorInventory(
        this.survivorsAdapter,
        getItemByID,
        this.inventoryAdapter,
      );

      const newSurvivor = await addSurvivorService.execute(survivor);

      const survivorInventory = initialInventory.map(
        (item) => addItemsToTheSurvivorInventory.execute({
          ...item,
          survivor_id: newSurvivor.id,
        }),
      );

      const inventory = await Promise.all(survivorInventory);

      return {
        ...newSurvivor,
        suvivor_inventory: inventory,
      };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new AppError(`check the registration information ${error}`, 403);
      }
      throw new AppError(`Error when registering a survivor, ${error}`);
    }
  }
}
