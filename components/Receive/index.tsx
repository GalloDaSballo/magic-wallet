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

const etheriumSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25.311"
        height="45.007"
        viewBox="0 0 25.311 45.007"
    >
        <g
            id="Group_11"
            data-name="Group 11"
            transform="translate(-156.228 -74.578)"
        >
            <g
                id="Group_2"
                data-name="Group 2"
                transform="translate(157.677 103.132)"
            >
                <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M178.479,307.159l-10.623-7.444a.131.131,0,0,0-.184.18l10.638,15.956a.656.656,0,0,0,1.091,0L190.039,299.9a.131.131,0,0,0-.184-.18l-10.623,7.444a.656.656,0,0,1-.753,0Z"
                    transform="translate(-167.648 -299.69)"
                    fill="#fff"
                />
            </g>
            <g
                id="Group_3"
                data-name="Group 3"
                transform="translate(156.309 74.578)"
            >
                <path
                    id="Path_11"
                    data-name="Path 11"
                    d="M182.012,96.584l-12-21.668a.656.656,0,0,0-1.147,0l-12,21.668Z"
                    transform="translate(-156.862 -74.578)"
                    fill="#fff"
                />
            </g>
            <g
                id="Group_4"
                data-name="Group 4"
                transform="translate(168.884 74.578)"
            >
                <path
                    id="Path_12"
                    data-name="Path 12"
                    d="M256,96.584h12.575l-12-21.668a.649.649,0,0,0-.573-.338Z"
                    transform="translate(-256 -74.578)"
                    fill="#c4c4c4"
                />
            </g>
            <g
                id="Group_5"
                data-name="Group 5"
                transform="translate(156.228 87.829)"
            >
                <path
                    id="Path_13"
                    data-name="Path 13"
                    d="M168.508,197.054l-12-8.408a.656.656,0,0,1,0-1.074l12-8.408a.655.655,0,0,1,.752,0l12,8.408a.656.656,0,0,1,0,1.074l-12,8.408A.655.655,0,0,1,168.508,197.054Z"
                    transform="translate(-156.228 -179.045)"
                    fill="#c4c4c4"
                />
            </g>
            <g
                id="Group_6"
                data-name="Group 6"
                transform="translate(168.884 87.829)"
            >
                <path
                    id="Path_14"
                    data-name="Path 14"
                    d="M256.376,197.054l12-8.408a.656.656,0,0,0,0-1.074l-12-8.408a.655.655,0,0,0-.376-.119v18.128A.653.653,0,0,0,256.376,197.054Z"
                    transform="translate(-256 -179.045)"
                    fill="#8e8e8e"
                />
            </g>
            <g
                id="Group_8"
                data-name="Group 8"
                transform="translate(168.884 103.132)"
            >
                <path
                    id="Path_16"
                    data-name="Path 16"
                    d="M256.545,315.85l10.638-15.956a.131.131,0,0,0-.184-.18l-10.623,7.444a.655.655,0,0,1-.376.119v8.866a.65.65,0,0,0,.545-.292Z"
                    transform="translate(-256 -299.689)"
                    fill="#8e8e8e"
                />
            </g>
        </g>
    </svg>
);

export default Receive;
