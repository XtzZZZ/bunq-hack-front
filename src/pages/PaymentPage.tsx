import { useEffect, useState } from "react";
import payment from "../assets/paymentInvoice.png";
import styles from "../styles/pages/PaymentPage.module.scss";
import config from "../config/config.ts";

export default function PaymentPage() {
    const [link, setLink] = useState<string | null>(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem("paymentData");
        if (storedData) {
            const { shareCode, amount } = JSON.parse(storedData);

            const getLink = async () => {
                try {
                    const response = await fetch(
                        `${config.apiBaseUrl}/api/shared/${shareCode}/pay/${amount}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setLink(data.paymentLink);
                    }
                } catch (error) {
                    console.error("Error fetching payment link:", error);
                }
            };

            getLink().then();
        }
    }, []);

    return (
        <main className={styles.payment_page_ctr}>
            {/* Display static image */}
            <img src={payment} alt="Payment" className={styles.payment_img} />

            {/* Display payment link */}
            {link ? (
                <span className={styles.link_span}>
                    {link}
                </span>
            ) : (
                <span className={styles.link_span}>Loading payment link...</span>
            )}
        </main>
    )
}