import { IItem } from '../index';

export interface GetItemByID {
    execute(item_id: string): Promise<IItem | undefined>;
}
