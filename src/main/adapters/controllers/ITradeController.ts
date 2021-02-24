import { TradeItemDTO } from '../../../domain';
import { ISurvivorsAdapter, IInventoryAdapter, IItemAdapter } from '../../../adapters';

export abstract class ITradeController {
  constructor(
        protected survivorsAdapter: ISurvivorsAdapter,
        protected inventoryAdapter: IInventoryAdapter,
        protected itemAdapter: IItemAdapter,
  ) {}

  abstract store(data: TradeItemDTO): Promise<void>
}
