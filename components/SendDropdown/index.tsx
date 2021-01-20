import { useState } from "react";

import ClickAwayListener from "react-click-away-listener";
import { TokenWithBalance } from "../../interfaces/tokens";
import { formatERC20 } from "../../utils/format";

import styles from "./SendDropdown.module.scss";

type TokenItemProps = {
    token: TokenWithBalance | null;
    handleActiveItem?: (token: TokenWithBalance | null) => void;
};

type SendDropdownProps = {
    setToken: (token: TokenWithBalance | null) => void;
    sendebleBalances: unknown[];
    token: TokenWithBalance | null;
    ethBalance: string;
};

const TokenItem = ({
    token,
    handleActiveItem,
}: TokenItemProps): JSX.Element => {
    if (token && handleActiveItem) {
        return (
            <button type="button" onClick={() => handleActiveItem(token)}>
                <img alt={`${token.name} Logo`} src={token.logoURI} />
                <div className={styles.sendDropdown__values}>
                    <span>{token.symbol}</span>
                    <span>
                        Balance: {formatERC20(token.balance, token.decimals)}{" "}
                        {token.symbol}
                    </span>
                </div>
            </button>
        );
    }

    return <></>;
};

const SendDropdown = ({
    setToken,
    sendebleBalances,
    token,
    ethBalance,
}: SendDropdownProps): JSX.Element => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleActiveItem = (tokenToSet: TokenWithBalance | null): void => {
        setShowDropdown(false);
        setToken(tokenToSet);
    };

    return (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)} as="div">
            <div
                className={styles.sendDropdown}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <img
                    src="images/polygon-down.svg"
                    alt="Dropdown"
                    className={styles.sendDropdown__polygon}
                />
                <span className={styles.sendDropdown__label}>Token Name</span>
                {!token ? (
                    <div className={styles.sendDropdown__activeItem}>
                        <img
                            alt="Etherium Logo"
                            src="images/etherium-small.svg"
                        />
                        <div className={styles.sendDropdown__values}>
                            <span>ETH</span>
                            <span>Balance: {ethBalance} ETH</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.sendDropdown__activeItem}>
                        <img alt={`${token.name} Logo`} src={token.logoURI} />
                        <div className={styles.sendDropdown__values}>
                            <span>{token.symbol}</span>
                            <span>
                                Balance:{" "}
                                {formatERC20(token.balance, token.decimals)}{" "}
                                {token.symbol}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <ul
                className={`${styles.sendDropdown__list} ${
                    showDropdown ? styles.show : ""
                }`}
            >
                {sendebleBalances.map((balanceToken: any) => (
                    <li key={balanceToken.symbol}>
                        <TokenItem
                            token={balanceToken}
                            handleActiveItem={handleActiveItem}
                        />
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        onClick={() => handleActiveItem(null)}
                    >
                        <img
                            alt="Etherium Logo"
                            src="images/etherium-small.svg"
                        />
                        <div className={styles.sendDropdown__values}>
                            <span>ETH</span>
                            <span>Balance: {ethBalance} ETH</span>
                        </div>
                    </button>
                </li>
            </ul>
        </ClickAwayListener>
    );
};

export default SendDropdown;
