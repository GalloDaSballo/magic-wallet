import { useState, useMemo } from 'react'
import useETHBalance from '../../hooks/useETHBalance'
import useERC20Balances from '../../hooks/useERC20Balances'
import { BigNumber } from 'ethers'
import { TokenWithBalance } from '../../interfaces/tokens'
import { fromStringToBN } from '../../utils/inputs'
import { formatETH, formatERC20 } from '../../utils/format'

const getMinimumStep = (decimals: number): string => String(1 / 10 ** decimals)

const getMaximumAmount = (
  token: TokenWithBalance | null,
  ethBalance: BigNumber
): string =>
  token ? formatERC20(token.balance, token.decimals) : formatETH(ethBalance)

const Send = (): JSX.Element => {
  const [ethBalance] = useETHBalance()
  const [tokenBalances] = useERC20Balances()

  const [token, setToken] = useState(null) //null is ETH, simpler than using a hack
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(BigNumber.from('0'))

  const useSendableBalances = useMemo(
    () => tokenBalances.filter((token) => token.balance.gt(0)),
    [tokenBalances]
  )

  //Decimals defaults to 18, so we can use FormatERC20 for ETH as well
  const decimals = useMemo(() => (token ? token.decimals : 18), [token])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('TODO')
  }

  const handleAmountChange = (e) => {
    setAmount(fromStringToBN(e.target.value, decimals))
  }

  return (
    <div>
      <h2>Send</h2>
      <form onSubmit={handleSubmit}>
        <h3>What do you want to send?</h3>
        <p>Sending {token ? token.symbol : 'ETH'}</p>

        {/* SET TOKEN */}
        <button type="button" onClick={() => setToken(null)}>
          ETH
        </button>
        {useSendableBalances.map(
          (token: TokenWithBalance): JSX.Element => (
            <button
              type="button"
              key={token.symbol}
              onClick={() => setToken(token)}
            >
              {token.symbol}, {formatERC20(token.balance, token.decimals)}
            </button>
          )
        )}

        {/* SET AMOUNT */}
        <h3>Amount</h3>
        <input
          type="number"
          step={getMinimumStep(decimals)}
          value={formatERC20(amount, decimals)}
          onChange={handleAmountChange}
          min="0"
          max={getMaximumAmount(token, ethBalance)}
        />

        <h3>To</h3>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        {/* CONFIRM */}
        <button disabled={amount.lte(0)} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default Send
