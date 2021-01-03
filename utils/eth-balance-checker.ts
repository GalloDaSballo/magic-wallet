import { ethers, providers } from 'ethers'
import { Token, TokenWithBalance } from '../interfaces/tokens'
import BalanceCheckerABI from 'eth-balance-checker/abis/BalanceChecker.abi.json'
//This code uses the Smart Contract from: https://github.com/wbobeirne/eth-balance-checker
const MAINNET_BALANCE_CHECKER_ADDRESS =
  '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39'

export const getEthersBalances = async (
  provider: providers.JsonRpcProvider,
  addresses: string[],
  tokens: Token[]
): Promise<TokenWithBalance[]> => {
  const parseableTokens = tokens.map((token) => token.address)
  //Generate Contract
  const contract = new ethers.Contract(
    MAINNET_BALANCE_CHECKER_ADDRESS,
    BalanceCheckerABI,
    provider
  )

  //Query contract
  const balances = await contract.balances(addresses, parseableTokens)

  const merged = tokens
    .map((token, index) => ({ ...token, balance: balances[index] }))
    .sort((a, b) =>
      a.balance.gt(b.balance) ? -1 : a.balance.eq(b.balance) ? 0 : 1
    )

  //Return values
  return merged
}
