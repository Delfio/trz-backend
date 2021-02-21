import { ISurvivor } from '..';

export type ITraderProfile = {
    profile: ISurvivor,
    item: [{
        item_id: string,
        amount: number
    }],
}

export type INegotiation = {
    info_survivor_trader_n1: ITraderProfile,
    info_survivor_trader_n2: ITraderProfile,
}

export interface TradeItem {
    execute(data: INegotiation): Promise<void>
}
