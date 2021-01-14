import { UserContextProvider } from "../context/UserContext";
import { AppProps } from "next/dist/next-server/lib/router/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <UserContextProvider>
            <Component {...pageProps} />
        </UserContextProvider>
    );
}

export default MyApp;
