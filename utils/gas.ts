import { BigNumber, utils } from "ethers";
import { GasPrices, GasSpeed } from "../interfaces/gas";

/**
 * Retrieves the gas prices from EthGasStation
 * See https://docs.ethgasstation.info/gas-price
 */
export const getGasPrices = async (): Promise<GasPrices> => {
    const res = await fetch("https://ethgasstation.info/api/ethgasAPI.json");
    const costs: GasPrices = await res.json();

    return costs;
};

export const getGasPrice = async (speed: GasSpeed): Promise<BigNumber> => {
    const prices = await getGasPrices();
    return utils.parseUnits(String(prices[speed] / 10), "gwei");
};

export const getFastGasPrice = async (): Promise<BigNumber> =>
    getGasPrice(GasSpeed.fast);
