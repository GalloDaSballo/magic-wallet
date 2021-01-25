import { useState, useEffect, useMemo, FormEvent } from "react";
import { ethers, utils, BigNumber } from "ethers";
import useETHBalance from "../../hooks/useETHBalance";
import useERC20Balances from "../../hooks/useERC20Balances";
import { TokenWithBalance } from "../../interfaces/tokens";
import { fromStringToBN } from "../../utils/inputs";
import { formatETH, formatERC20, formatGas } from "../../utils/format";
import { getFastGasPrice } from "../../utils/gas";
import { useUser } from "../../context/UserContext";

import SendDropdown from "../SendDropdown";

import styles from "./Send.module.scss";
import { sendERC20, sendEth } from "../../utils/transactions";

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
    const user = useUser();

    const [token, setToken] = useState<TokenWithBalance | null>(null); // null is ETH, simpler than using a hack
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const BNAmount = useMemo(
        () => fromStringToBN(amount, token?.decimals || 18), // Eth has 18 decimals
        [amount, token],
    );

    const [gas, setGas] = useState<BigNumber>(BigNumber.from(50));
    useEffect(() => {
        const fetchGasPrices = async () => {
            const fastPrice = await getFastGasPrice();
            setGas(fastPrice);
        };
        fetchGasPrices();
    }, []);

    const useSendableBalances = useMemo(
        (): TokenWithBalance[] =>
            tokenBalances.filter((t: TokenWithBalance) => t.balance.gt(0)),
        [tokenBalances],
    );

    // Decimals defaults to 18, so we can use FormatERC20 for ETH as well
    const decimals = useMemo(() => (token ? token.decimals : 18), [token]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            let tx: ethers.providers.TransactionReceipt | null = null;
            if (!user?.provider) {
                return;
            }

            if (token) {
                tx = await sendERC20(user.provider, address, BNAmount, token);
            } else {
                tx = await sendEth(
                    user?.provider,
                    address,
                    BNAmount,
                    ethBalance,
                );
            }

            alert(`Success ${tx.transactionHash}`);
        } catch (err) {
            alert(`Error  ${err}`);
        }
        setLoading(false);
    };

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
                    </div>
                </div>

                {/* If you want to add Gas Controls */}
                <div className={styles.formControl}>
                    <label htmlFor="gas">Gas (Transaction Fee) in gwei</label>
                    <input
                        type="number"
                        name="gas"
                        id="gas"
                        value={formatGas(gas)}
                        onChange={(e) =>
                            setGas(utils.parseUnits(e.target.value, "gwei"))
                        }
                        step={1}
                    />
                </div>

                <div className={styles.btnContainer}>
                    {/* CANCEL */}
                    <button
                        type="button"
                        disabled={loading}
                        onClick={goBackToWallet}
                    >
                        Cancel
                    </button>

                    {/* CONFIRM */}
                    <button disabled={BNAmount.lte(0) || loading} type="submit">
                        Send
                    </button>
                </div>

                {loading && <p>Loading</p>}
            </form>
        </section>
    );
};

export default Send;
