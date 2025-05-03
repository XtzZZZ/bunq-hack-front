import payment from "../assets/paymentInvoice.png"
import styles from "../styles/pages/PaymentPage.module.scss"
export default function PaymentPage() {

    return (
        <main className={styles.payment_page_ctr}>
            <img src={payment} alt={"Payment"} className={styles.payment_img}/>
        </main>
    )
}