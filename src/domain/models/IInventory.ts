import { IItem } from './IItem';
import { InventoryDTO } from '../DTO/InventoryDTO';

export interface IInventory extends InventoryDTO {
    item?: IItem;
}
