import {
  IInventoryAdapter,
  IItemAdapter,
  ISurvivorsAdapter,
} from '../../../adapters';

import { IResultOfReport } from '../../../domain';

export abstract class IReportsController {
  constructor(
        protected inventoryAdapter: IInventoryAdapter,
        protected itemAdapter: IItemAdapter,
        protected survivorsAdapter: ISurvivorsAdapter,
  ) {}

  abstract index(): Promise<IResultOfReport>;
}
