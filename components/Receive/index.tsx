import { useUser } from '../../context/UserContext'

const Receive = (): JSX.Element => {
  const user = useUser()
  return (
    <div>
      <h2>Receive</h2>
      <p>Your Address</p>
      <p>{user.address}</p>
    </div>
  )
}

export default Receive
