import { utils } from "ethers";

const { parseUnits } = utils;
/**
 *
 * @param newValue string
 */
export const fromStringToBN = (newValue: string, decimals: number) => {
    if (newValue.trim() === "") return parseUnits("0", decimals);
    try {
        return parseUnits(newValue, decimals);
    } catch {
        // remove any decimals after the decimalsTHh
        const trimmedString = parseFloat(newValue).toFixed(decimals);
        return parseUnits(trimmedString, decimals);
    }
};
