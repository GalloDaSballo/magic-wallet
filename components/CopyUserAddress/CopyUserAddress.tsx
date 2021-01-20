import styles from "./CopyUserAddress.module.scss";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

type CopyUserAddressProps = {
    address: string;
    color: "blue" | "gray";
};

const CopyUserAddress = ({
    address,
    color,
}: CopyUserAddressProps): JSX.Element => {
    const [copied, setCopied] = useState<boolean>(false);

    const shortenUserAddress = (): string => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleCopyClick = () => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <CopyToClipboard text={address} onCopy={handleCopyClick}>
            <div
                className={`${styles.copyUserAddress} ${
                    color === "blue"
                        ? styles.copyUserAddress__blue
                        : styles.copyUserAddress__gray
                }`}
            >
                <img
                    src={`/images/copy-${
                        color === "blue" ? "blue" : "gray"
                    }.svg`}
                    alt="Copy"
                />

                <p>{copied ? "Copied" : shortenUserAddress()}</p>
            </div>
        </CopyToClipboard>
    );
};

export default CopyUserAddress;
