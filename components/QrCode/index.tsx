import EthereumQRPlugin from "ethereum-qr-code";
import { useEffect } from "react";
import styles from "./QRCode.module.scss";

// Thank you @NikVogri
// https://github.com/GalloDaSballo/atossa-frontend/blob/main/components/QRCode.tsx

const QRCode: React.FC<{address: string;}> = ({address}) => {
    useEffect(() => {
        const qr = new EthereumQRPlugin();

        qr.toCanvas(
            {
                to: address || "",
                value: 1,
            },
            {
                selector: `.${styles.qrcode}`,
                scale: 60,
            },
        );
    }, []);

    return <div className={styles.qrcode} />;
};

export default QRCode;
