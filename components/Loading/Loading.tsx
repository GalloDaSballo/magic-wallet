import { TokenWithBalance } from "../../interfaces/tokens";
import styles from "./Loading.module.scss";

type Props = {
    address: string;
    amount: string;
    token: TokenWithBalance;
};

const TransferSuccess = ({ address, amount, token }: Props): JSX.Element => {
    return (
        <div className={styles.loading}>
            <img
                src="/images/transfer-successful.svg"
                alt="Transfer was successful"
            />
            <h2>
                Sending {amount} {token ? token.name : "ETH"} to {address}
            </h2>
        </div>
    );
};

export default TransferSuccess;
