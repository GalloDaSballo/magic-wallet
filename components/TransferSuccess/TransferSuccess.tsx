import React from "react";
import styles from "./TransferSuccess.module.scss";

const TransferSuccess = () => {
    return (
        <div className={styles.transferSuccessful}>
            <img
                src="/images/transfer-successful.svg"
                alt="Transfer was successful"
            />
            <h1>Your Transfer was successful!</h1>

            {/* TODO: make this button do something */}
            <button type="button">Complete</button>
        </div>
    );
};

export default TransferSuccess;
