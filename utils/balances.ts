
//TODO https://github.com/wbobeirne/eth-balance-checker


export const getETHBalance = async (provider) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address)
  return balance
}