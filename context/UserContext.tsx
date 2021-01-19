import { Magic } from "magic-sdk";
import { createContext, useState, useEffect, useContext } from "react";
import { ethers, BigNumber } from "ethers";

let m: Magic; // Magic requires window to function

export type UserData = {
    baseAddress: string;
    proxyWalletAddress: string;
    usdc: BigNumber;
    avatar: string;
    username: string;
    loggedIn: boolean;
};

// TODO: Use Interface
interface User {
    email: string;
    address: string;
    provider: ethers.providers.Web3Provider;
}

type UserContextData = {
    user: User | null;
    logout: () => void;
    login: (_email: string) => void;
};

const UserContext = createContext<UserContextData>({
    user: null,
    login: (_email) => null,
    logout: () => null,
});
export default UserContext;

export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const getAddressAndProvider = async () => {
        const provider = new ethers.providers.Web3Provider(
            m.rpcProvider as any,
        );
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return { address, provider };
    };

    /**
     * Logs the user out of magic
     */
    const logout = async () => {
        try {
            await m.user.logout();
            setUser(null);
        } catch (err) {
            // Do nothing
            setUser(user);
        }
    };

    const login = async (email: string) => {
        try {
            await m.auth.loginWithMagicLink({ email });
            const { address, provider } = await getAddressAndProvider();
            setUser({
                email,
                address,
                provider,
            });
        } catch (err) {
            logout();
        }
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
                    email: String(email),
                    address,
                    provider,
                });
            }
        } catch (err) {
            logout();
        }
    };

    useEffect(() => {
        m = new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY || "");

        persistUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useLogin = () => {
    const { login } = useContext(UserContext);

    return login;
};

export const useLogout = () => {
    const { logout } = useContext(UserContext);

    return logout;
};

export const useUser = () => {
    const { user } = useContext(UserContext);

    return user;
};
