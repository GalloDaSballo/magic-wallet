import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { getETHBalance } from '../utils/balances'
import { BigNumber } from 'ethers'

const useETHBalance = (): [BigNumber, () => Promise<void>] => {
  const user = useUser()
  const [balance, setBalance] = useState(BigNumber.from('0'))

  const fetchUserETH = async () => {
    try {
      const ethBalance = await getETHBalance(user.provider)
      setBalance(ethBalance)
    } catch (err) {
      setBalance(BigNumber.from('0'))
    }
  }

  useEffect(() => {
    fetchUserETH()
  }, [user.provider])

  return [balance, fetchUserETH]
}

export default useETHBalance
