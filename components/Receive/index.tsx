import { useUser } from "../../context/UserContext";
import CopyUserAddress from "../CopyUserAddress/CopyUserAddress";
import QrCode from "../QrCode";

import styles from "./Receive.module.scss";

type ReceiveProps = {
    goBackToWallet: () => void;
};

const Receive = ({ goBackToWallet }: ReceiveProps): JSX.Element | null => {
    const user = useUser();

    if (!user) {
        return null;
    }
    return (
        <section className={styles.receive}>
            <div className={styles.receive__header}>
                <h1>Receive</h1>
            </div>
            <div className={styles.receive__body}>
                <QrCode address={user.address} />

                <span>Your Address</span>
                <CopyUserAddress address={user.address} color="gray" />

                <div className={styles.receive__notif}>
                    <img src="/images/etherium.svg" alt="Etherium" />
                    <p>Make sure to send exclusively ETH or ERC-20 Tokens</p>
                </div>

                <button
                    type="button"
                    onClick={goBackToWallet}
                    className={styles.receive__backBtn}
                >
                    Close
                </button>
            </div>
        </section>
    );
};

export default Receive;
