import React from "react";
import styles from "./TransferSuccess.module.scss";

type Props = {
    goBack: () => void;
    transactionHash: string;
};

const TransferSuccess = ({ goBack, transactionHash }: Props): JSX.Element => {
    return (
        <div className={styles.transferSuccessful}>
            <img
                src="/images/transfer-successful.svg"
                alt="Transfer was successful"
            />
            <h1>Your Transfer was successful!</h1>
            <p>Transaction Hash: {transactionHash}</p>

            <button onClick={goBack} type="button">
                Complete
            </button>
        </div>
    );
};

export default TransferSuccess;
