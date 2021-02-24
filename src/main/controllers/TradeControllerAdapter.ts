import * as Yup from 'yup';
import AppError from '../usecase/MainErros';
import { INegotiation, TradeItemDTO } from '../../domain';
import { ITradeController } from '../adapters';
import TradeItem from '../../services/TradeItem';
import GetAllInformationsOfSurvivor from '../../services/GetAllInformationsOfSurvivor';
import DomainErro from '../../usecases/validations/DomainErro';

export class TradeController extends ITradeController {
  async store(data: TradeItemDTO): Promise<void> {
    const schema = Yup.object().shape({
      info_survivor_trader_n1: Yup.object().shape({
        profile: Yup.object().shape({
          survivor_id: Yup.string().required(''),
        }),
        item: Yup.array().of(
          Yup.object().shape({
            item_id: Yup.string().required('asdfasdf'),
            amount: Yup.number().required(''),
          }),
        ),
      }),
      info_survivor_trader_n2: Yup.object().shape({

      }),
    });
    try {
      await schema.isValid(data);

      const getAllInformationsOfSurvivorService = new GetAllInformationsOfSurvivor(
        this.survivorsAdapter,
      );

      const tradeItem = new TradeItem(
        this.inventoryAdapter,
        this.itemAdapter,
        this.survivorsAdapter,
      );

      const {
        info_survivor_trader_n1,
        info_survivor_trader_n2,
      } = data;

      const [survivorTraderN1, survivorTraderN2] = await Promise.all([
        getAllInformationsOfSurvivorService.execute(info_survivor_trader_n1.profile.survivor_id),
        getAllInformationsOfSurvivorService.execute(info_survivor_trader_n2.profile.survivor_id),
      ]);

      if (!survivorTraderN1 || !survivorTraderN2) {
        throw new AppError('invalid request! Survivors not found');
      }

      const negociation: INegotiation = {
        info_survivor_trader_n1: {
          ...info_survivor_trader_n1,
          profile: survivorTraderN1,
        },
        info_survivor_trader_n2: {
          ...info_survivor_trader_n2,
          profile: survivorTraderN2,
        },
      };

      await tradeItem.execute(negociation);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new AppError(`check the registration information ${error}`, 403);
      }

      if (error instanceof DomainErro) {
        throw new AppError(error.message, 406);
      }

      throw error;
    }
  }
}
