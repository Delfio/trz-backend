import * as Yup from 'yup';
import { ISurvivor } from '../../domain';
import { ISurvivorsAdapter, IItemAdapter, IInventoryAdapter } from '../../adapters';
import AddSurvivorAlongWithTheirStartingItems from '../../services/AddSurvivorAlongWithTheirStartingItems';
import GetItemByID from '../../services/GetItemByID';
import { RegisterSurvivorWithStartingItemsDTO } from '../../domain/DTO/RegisterSurvivorWithStartingItemsDTO';
import AppError from '../usecase/MainErros';
import DomainErrors from '../../usecases/validations/DomainErro';

export class SurvivorController {
  constructor(
      private survivorsAdapter: ISurvivorsAdapter,
      private itemAdapter: IItemAdapter,
      private inventoryAdapter: IInventoryAdapter,
  ) {}

  async index(): Promise<ISurvivor[]> {
    return this.survivorsAdapter.getAllSurvivors();
  }

  async store(data: RegisterSurvivorWithStartingItemsDTO): Promise<ISurvivor> {
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required('i know we are into apocalypse, but use your real name!'),
      age: Yup.number().required('Here we risk our lives, it not a scenario for children, please enter your age!'),
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

      const addSurvivorService = new AddSurvivorAlongWithTheirStartingItems(
        this.survivorsAdapter,
        this.itemAdapter,
        this.inventoryAdapter,
      );

      const newSurvivor = await addSurvivorService.execute({
        initialInventory,
        survivor,
      });

      return newSurvivor;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new AppError(`check the registration information ${error}`, 403);
      }

      if (error instanceof DomainErrors) {
        throw new AppError('insufficient information for registration, please check your request', 406);
      }

      throw error;
    }
  }
}
