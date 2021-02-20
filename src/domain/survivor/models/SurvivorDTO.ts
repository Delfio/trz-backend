export type coords_of_survivor = {
    latitude: number;
    longitude: number
}

export interface SurvivorDTO {
    name: string,
    age: number,
    lastLocation: coords_of_survivor,
}
