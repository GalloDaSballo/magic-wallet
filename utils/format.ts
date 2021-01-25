import { BigNumber, ethers } from "ethers";

export const formatETH = (balance: BigNumber): string => {
    if (!balance) {
        return "0.00";
    }
    return ethers.utils.formatEther(balance);
};

export const formatERC20 = (balance: BigNumber, decimals: number): string => {
    return ethers.utils.formatUnits(balance, decimals);
};

export const formatGas = (gas: BigNumber): string => {
    return String(parseInt(ethers.utils.formatUnits(gas, "gwei"), 10));
};
