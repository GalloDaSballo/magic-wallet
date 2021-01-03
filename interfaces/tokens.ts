import { BigNumber } from 'ethers'

export interface Token {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

export interface TokenList {
  tokens: Token[]
}

export interface TokenWithBalance extends Token {
  balance: BigNumber;
}