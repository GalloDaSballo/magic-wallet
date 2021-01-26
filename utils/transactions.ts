import { ethers, BigNumber, utils, Contract } from "ethers";
import { TokenWithBalance } from "../interfaces/tokens";
import IERC20ABI from "../abi/IERC20.abi.json";

const ETH_SEND_GAS = BigNumber.from(21000);

/**
 * Given an amount, a max, gas and gasPrice, returns the maximum amount of Eth we can spend
 * @param amount
 * @param maxEth
 * @param gasPrice
 */
export const getMaxEthAfterGas = (
    amount: BigNumber,
    maxEth: BigNumber,
    gasPrice: BigNumber,
) => {
    const gasCost = ETH_SEND_GAS.mul(gasPrice);
    const total = amount.add(gasCost);

    // If you can afford it, send total, else send maxEth - gasCost
    return maxEth.gte(total) ? amount : maxEth.sub(gasCost);
};

/**
 * Ensures you are sending to a valid address and you're not sending to yourself
 * @param signer
 * @param address
 */
export const verifySend = async (
    signer: ethers.providers.JsonRpcSigner,
    address: string,
) => {
    if (!utils.isAddress(address)) {
        throw new Error("Destination is not valid");
    }

    const senderAdress = await signer.getAddress();
    if (senderAdress === address) {
        throw new Error("Don't send to yourself! ");
    }
};

/**
 * Send Eth amount from provider to address
 * @param provider
 * @param address
 * @param amount
 * @param maxEth
 */
export const sendEth = async (
    provider: ethers.providers.Web3Provider,
    to: string,
    amount: BigNumber,
    maxEth: BigNumber,
    gasPrice: BigNumber,
): Promise<ethers.providers.TransactionReceipt> => {
    // Check signer address for safety
    const signer = provider.getSigner();
    await verifySend(signer, to);

    const value = getMaxEthAfterGas(amount, maxEth, gasPrice);

    // Submit transaction to the blockchain
    const tx = await signer.sendTransaction({
        to,
        value,
        gasPrice,
    });

    // Wait for send success
    const receipt = await tx.wait();

    return receipt;
};

/**
 * Send the amount of token from provider to address
 * @param provider
 * @param address
 * @param amount
 * @param token
 */
export const sendERC20 = async (
    provider: ethers.providers.Web3Provider,
    address: string,
    amount: BigNumber,
    token: TokenWithBalance,
    gasPrice: BigNumber,
): Promise<ethers.providers.TransactionReceipt> => {
    // Check signer address for safety
    const signer = provider.getSigner();
    await verifySend(signer, address);

    // Generate Contract with signer
    const contract = new Contract(token.address, IERC20ABI, signer);

    // Only send up to token.balance
    const maxAmount = amount.lte(token.balance) ? amount : token.balance;

    // Submit transaction to the blockchain
    const tx = await contract.transfer(address, maxAmount, { gasPrice });

    // Wait for send success
    const receipt = await tx.wait();

    return receipt;
};
