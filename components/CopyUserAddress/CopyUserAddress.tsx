import styles from "./CopyUserAddress.module.scss";

type CopyUserAddressProps = {
    address: string;
    color: "blue" | "gray";
};

const CopyUserAddress = ({
    address,
    color,
}: CopyUserAddressProps): JSX.Element => {
    const shortenUserAddress = (): string => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const copyUserAddress = (): void => {
        navigator.clipboard.writeText(address);
    };

    return (
        <div
            className={`${styles.copyUserAddress} ${
                color === "blue"
                    ? styles.copyUserAddress__blue
                    : styles.copyUserAddress__gray
            }`}
        >
            <button title="Copy Address" onClick={copyUserAddress}>
                <img
                    src={`/images/copy-${
                        color === "blue" ? "blue" : "gray"
                    }.svg`}
                    alt="Copy"
                />
            </button>
            <p>{shortenUserAddress()}</p>
        </div>
    );
};

export default CopyUserAddress;
