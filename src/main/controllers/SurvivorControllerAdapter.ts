import * as Yup from 'yup';
import { ISurvivor, RegisterSurvivorWithStartingItemsDTO, UpdateSurvivorLocationDTO } from '../../domain';
import AddSurvivorAlongWithTheirStartingItems from '../../services/AddSurvivorAlongWithTheirStartingItems';
import UpdateSurvivorLocation from '../../services/UpdateSurvivorLocation';
import GetAllInformationsOfSurvivor from '../../services/GetAllInformationsOfSurvivor';
import AppError from '../usecase/MainErros';
import DomainErrors from '../../usecases/validations/DomainErro';

import { ISurvivorController } from '../adapters/controllers/ISurvivorController';

export class SurvivorController extends ISurvivorController {
  async index(): Promise<ISurvivor[]> {
    return this.survivorsAdapter.getAllSurvivors();
  }

  async show(survivor_id: string): Promise<ISurvivor | undefined> {
    if (!survivor_id) {
      throw new AppError('invalid informations!');
    }
    const getAllInformationsOfSurvivor = new GetAllInformationsOfSurvivor(this.survivorsAdapter);
    return getAllInformationsOfSurvivor.execute(survivor_id);
  }

  async store(data: RegisterSurvivorWithStartingItemsDTO): Promise<ISurvivor> {
    const schemaValidation = Yup.object().shape({
      survivor: Yup.object().shape({
        name: Yup.string().required('i know we are into apocalypse, but use your real name!'),
        age: Yup.number().required('Here we risk our lives, it not a scenario for children, please enter your age!'),
        latitude: Yup.number().required('latitude cannot be empty'),
        longitude: Yup.number().required('longitude cannot be empty'),
      }).required('necessary to inform the survivor data'),
      initialInventory: Yup.array().of(
        Yup.object().shape({
          item_id: Yup.string().required('item id required'),
          amount: Yup.number().required('necessary to inform the quantity of the item').min(1, 'minimum item quantity must be 1'),
        }),
      ).required('necessary to inform the initial items'),
    });

    try {
      await schemaValidation.validate(data, {
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
        throw new AppError(`check the registration information [${error.errors}]`, 403);
      }

      if (error instanceof DomainErrors) {
        throw new AppError(`insufficient information for registration, [${error.message}] please check your request`, 406);
      }

      throw error;
    }
  }

  async update(data: UpdateSurvivorLocationDTO): Promise<ISurvivor | undefined> {
    const schmea = Yup.object().shape({
      survivor_id: Yup.string().required(''),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    try {
      await schmea.isValid(data);

      const updateSurvivorLocation = new UpdateSurvivorLocation(this.survivorsAdapter);

      return updateSurvivorLocation.execute(data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new AppError(`check the registration information [${error.errors}]`, 403);
      }

      if (error instanceof DomainErrors) {
        throw new AppError(`insufficient information for registration, [${error.message}] please check your request`, 406);
      }

      throw error;
    }
  }
}
