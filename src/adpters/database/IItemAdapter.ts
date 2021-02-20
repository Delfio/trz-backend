import { IItem } from '../../domain';

interface IItemAdapter {
    getItemById(item_id: string): Promise<IItem | undefined>,
    getAllItens(): Promise<IItem[]>,
    getCatalogOfItem(): Promise<IItem[]>,
}

export default IItemAdapter;
