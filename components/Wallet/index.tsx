import useETHBalance from '../../hooks/useETHBalance'
import { useUser, useLogout } from '../../context/UserContext'
import {formatETH} from '../../utils/format'

const Wallet = (): JSX.Element => {
  const user = useUser()
  const logout = useLogout()

  const [ethBalance, reloadEth] = useETHBalance() 
  return (
    <div>
      <p>ETH: {formatETH(ethBalance)} <button onClick={reloadEth}>Reload</button></p>
      <p>{user.address}</p>


      <button onClick={logout}>Logout</button>

    </div>
  )
}

export default Wallet