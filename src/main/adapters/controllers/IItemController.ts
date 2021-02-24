import { IItem } from '../../../domain';
import { IItemAdapter } from '../../../adapters';

export abstract class IItemController {
  constructor(
        protected itemAdapter: IItemAdapter,
  ) {}

  abstract index(): Promise<IItem[]>;

  abstract show(item_id: string): Promise<IItem | undefined>
}
