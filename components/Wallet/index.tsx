import { useState } from "react";
import useETHBalance from "../../hooks/useETHBalance";
import useERC20Balances from "../../hooks/useERC20Balances";
import { useUser, useLogout } from "../../context/UserContext";
import { formatETH } from "../../utils/format";

import Send from "../Send";
import Receive from "../Receive";

const Wallet = (): JSX.Element | null => {
    const [send, setSend] = useState(false);
    const [receive, setReceive] = useState(false);
    const user = useUser();
    const logout = useLogout();

    const [ethBalance, reloadEth] = useETHBalance();
    const [balances, fetchUserErc20] = useERC20Balances();

    const reloader = () => {
        reloadEth();
        fetchUserErc20();
    };

    if (!user) {
        return null;
    }
    return (
        <div>
            <p>
                ETH: {formatETH(ethBalance)}{" "}
                <button onClick={reloader}>Reload</button>
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

            {send && <Send />}
            {receive && <Receive />}

            <button onClick={() => setSend(true)}>Send</button>
            <button onClick={() => setReceive(true)}>Receive</button>

            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Wallet;
