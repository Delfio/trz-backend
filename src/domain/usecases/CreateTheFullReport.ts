import {
  IResultOfReport,
} from '..';

export interface CreateTheFullReport {
    execute(): Promise<IResultOfReport>
}
