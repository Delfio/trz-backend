import { IReportsController } from '../adapters';
import {
  IResultOfReport,
} from '../../domain';

import CreateTheFullReport from '../../services/CreateTheFullReport';

export class ReportsController extends IReportsController {
  async index(): Promise<IResultOfReport> {
    const createTheFullReport = new CreateTheFullReport(
      this.inventoryAdapter,
      this.itemAdapter,
      this.survivorsAdapter,
    );

    return createTheFullReport.execute();
  }
}
