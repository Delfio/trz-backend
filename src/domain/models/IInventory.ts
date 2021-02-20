import { ITems } from './IITem';
import { InventoryDTO } from '../DTO/InventoryDTO';

export interface IInventory extends InventoryDTO {
    item?: ITems;
}
