import { useState, useMemo, FormEvent } from "react";
import { BigNumber } from "ethers";
import useETHBalance from "../../hooks/useETHBalance";
import useERC20Balances from "../../hooks/useERC20Balances";
import { TokenWithBalance } from "../../interfaces/tokens";
import { fromStringToBN } from "../../utils/inputs";
import { formatETH, formatERC20 } from "../../utils/format";

import SendDropdown from "../SendDropdown";

import styles from "./Send.module.scss";

const getMinimumStep = (decimals: number): string =>
    String(1 / 10 ** Math.min(decimals, 6)); // 6 decimals max because UX after is abysmal

const getMaximumAmount = (
    token: TokenWithBalance | null,
    ethBalance: BigNumber,
): string =>
    token ? formatERC20(token.balance, token.decimals) : formatETH(ethBalance);

type SendProps = {
    goBackToWallet: () => void;
};

const Send = ({ goBackToWallet }: SendProps): JSX.Element => {
    const [ethBalance] = useETHBalance();
    const [tokenBalances] = useERC20Balances();

    const [token, setToken] = useState<TokenWithBalance | null>(null); // null is ETH, simpler than using a hack
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");

    const BNAmount = useMemo(
        () => fromStringToBN(amount, token?.decimals || 18), // Eth has 18 decimals
        [amount, token],
    );

    const [gas, setGas] = useState("");

    const useSendableBalances = useMemo(
        (): TokenWithBalance[] =>
            tokenBalances.filter((t: TokenWithBalance) => t.balance.gt(0)),
        [tokenBalances],
    );

    // Decimals defaults to 18, so we can use FormatERC20 for ETH as well
    const decimals = useMemo(() => (token ? token.decimals : 18), [token]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("token", token);
        console.log("amount", amount.toString());
        console.log("gas", gas);

        alert("TODO");
    };

    console.log("BNAmount", BNAmount);

    return (
        <section className={styles.send}>
            <div className={styles.sendHeader}>
                <div className={styles.sendHeader__title}>
                    <h1>Send to</h1>
                </div>
                <div className={styles.sendHeader__image}>
                    <img src="images/send-header.svg" alt="Send to" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.send__form}>
                <div className={styles.formControl}>
                    <label htmlFor="sendTo">Send To</label>
                    <input
                        name="sendTo"
                        id="sendTo"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className={styles.formControl}>
                    {/* SET TOKEN */}
                    <SendDropdown
                        token={token}
                        sendebleBalances={useSendableBalances}
                        setToken={(tok: TokenWithBalance | null) =>
                            setToken(tok)
                        }
                        ethBalance={formatETH(ethBalance)}
                    />
                </div>

                <div className={styles.formControl}>
                    {/* SET AMOUNT */}
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        step={getMinimumStep(decimals)}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        max={getMaximumAmount(token, ethBalance)}
                    />
                    <div className={styles.formControl__extra}>
                        <span>{token ? token.symbol : "ETH"}</span>
                        {/* this needs to be converted somehow */}
                        {/* <span>$1329 USD</span> */}
                    </div>
                </div>

                <div className={styles.formControl}>
                    <label htmlFor="gas">Gas (Transaction Fee)</label>
                    <input
                        name="gas"
                        id="gas"
                        value={gas}
                        onChange={(e) => setGas(e.target.value)}
                    />
                </div>

                <div className={styles.btnContainer}>
                    {/* CANCEL */}
                    <button type="button" onClick={goBackToWallet}>
                        Cancel
                    </button>

                    {/* CONFIRM */}
                    <button disabled={BNAmount.lte(0)} type="submit">
                        Send
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Send;
