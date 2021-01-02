import {ethers} from 'ethers'

export const formatETH = (balance) => {
  if(!balance){
    return "0.00"
  }
  return ethers.utils.formatEther(balance)
}

export const formatERC20 = (balance, decimals) => {
  return ethers.utils.formatUnits(balance, decimals)
}