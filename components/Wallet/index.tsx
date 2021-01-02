import useETHBalance from '../../hooks/useETHBalance'
import useERC20Balances from '../../hooks/useERC20Balances'
import { useUser, useLogout } from '../../context/UserContext'
import { formatETH } from '../../utils/format'

const Wallet = (): JSX.Element => {
  const user = useUser()
  const logout = useLogout()

  const [ethBalance, reloadEth] = useETHBalance()
  const [balances, fetchUserErc20] = useERC20Balances()

  const reloader = () => {
    reloadEth()
    fetchUserErc20()
  }
  return (
    <div>
      <p>
        ETH: {formatETH(ethBalance)} <button onClick={reloader}>Reload</button>
      </p>
      <div>
        {balances.map((token) => (
          <div key={token.symbol}>
            {token.balance.gt(0) && (
              <p>
                {token.symbol} {token.balance.toString()}
              </p>
            )}
          </div>
        ))}
      </div>
      <p>{user.address}</p>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Wallet
