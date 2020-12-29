import { Magic } from 'magic-sdk';
import {
  createContext, useState, useEffect, useContext
} from 'react';
import { ethers } from 'ethers';

let m; //Magic requires window to function

const UserContext = createContext({
  user: null,
  login: (_email) => null,
  logout: () => null,

});
export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const getAddressAndProvider = async () => {
    const provider = new ethers.providers.Web3Provider(m.rpcProvider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { address, provider };
  };

  const login = async (email) => {
    try {
      await m.auth.loginWithMagicLink({ email });
      const { address, provider } = await getAddressAndProvider();
      setUser({
        email,
        address,
        provider,
      });
    } catch (err) {
      logout()
    }
  };

  /**
   * Logs the user out of magic
   */
  const logout = async () => {
    try {
      await m.user.logout();
      setUser(null);
    } catch (err) {}
  };

  /**
   * Checks if the user is already logged in, if they are, log them in automatically
   * Used in browser refreshes
   */
  const persistUser = async () => {
    try {
      const isLoggedIn = await m.user.isLoggedIn();

      if (isLoggedIn) {
        const { email } = await m.user.getMetadata();
        const { address, provider } = await getAddressAndProvider();
        setUser({
          email,
          address,
          provider,
        });
      }
    } catch (err) {
      logout()
    }
  };

  useEffect(() => {
    m = new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY);

    persistUser();
  }, []);

  return (
    <UserContext.Provider value={{
      user, login, logout
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useLogin = () => {
  const { login } = useContext(UserContext);

  return login
}

export const useLogout = () => {
  const { logout } = useContext(UserContext);

  return logout
}

export const useUser = () => {
  const { user } = useContext(UserContext);

  return user
}