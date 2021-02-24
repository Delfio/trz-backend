export type ITraderProfileDTO = {
    profile: {
        survivor_id: string
    },
    item: [{
        item_id: string,
        amount: number
    }],
}

export type TradeItemDTO = {
    info_survivor_trader_n1: ITraderProfileDTO,
    info_survivor_trader_n2: ITraderProfileDTO,
}
