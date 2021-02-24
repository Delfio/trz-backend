export type average = {
    item_id: string,
    item_description: string,
    average_by_survivor: number
}

export type IResultOfReport = {
    percentage_of_infected_survivors: number,
    percentage_of_non_infected_survivors: number,
    average_amount_of_resource_by_survivor: average[],
    points_lost_because_of_an_infected_survivor: number,
}
