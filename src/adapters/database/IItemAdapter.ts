import { IItem } from '../../domain';

export interface IItemAdapter {
    getItemById(item_id: string): Promise<IItem | undefined>;
    getAllItens(): Promise<IItem[]>;
    getCatalogOfItem(): Promise<IItem[]>;
}
