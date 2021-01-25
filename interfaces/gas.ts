// See https://docs.ethgasstation.info/gas-price

export enum GasSpeed {
    safeLow = "safeLow",
    average = "average",
    fast = "fast",
    fastest = "fastest",
}

export interface GasPrices {
    safeLow: number; // Less than 30 min
    average: number; // Less than 5 min
    fast: number; // Less than 2 min
    fastest: number; // Less than 30 sec
}
