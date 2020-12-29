import { useUser, useLogout } from '../../context/UserContext'
const Wallet = (): JSX.Element => {
  const user = useUser()
  const logout = useLogout()
  return (
    <div>
      {user.address}


      <button onClick={logout}>Logout</button>

    </div>
  )
}

export default Wallet