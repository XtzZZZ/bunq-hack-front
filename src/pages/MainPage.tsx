import styles from '../styles/pages/MainPage.module.scss'
import BillRecord from "../components/MainPage/BillRecord.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface APIResponse {
    id: string;
    name: string;
    createdAt: string;
    receipts: Receipt[];
    shareCode?: string | null;
    allItems: Item[];
}

interface Receipt {
    id: string;
    storeName: string;
    date: string;
    items: Item[];
    totalAmount: number;
}

interface Item {
    id: string;
    name: string;
    price: number;
    quantity: number;
    assignedToUserId?: string | null;
    matched: boolean;
}

interface Bill {
    id: string;
    name: string;
    date: string;
}

export default function MainPage() {
    const [bills, setBills] = useState<Bill[]>([]);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchBills = async () => {
            try {
                const response = await fetch("http://138.68.73.164/api/bills");
                const data = await response.json();
                const processedBills = data.map((bill: APIResponse) => ({
                    id: bill.id, // Use the top-level id
                    name: bill.name, // Use the top-level name
                    date: new Date(bill.createdAt).toLocaleDateString() // Format the ISO date
                }));
                setBills(processedBills);
            } catch (e) {
                console.error(e);
            }
        }
        fetchBills().then();
    }, [])

    return (
        <main className={styles.main_page_ctr}>
            <span className={styles.page_title}>
                Bill management
            </span>
            <button className={styles.new_bill_btn} onClick={() => {navigate("/bills")}}>
                New bill
            </button>
            <span className={styles.page_subtitle}>
                Your bills:
            </span>
            <div className={styles.bills_list_ctr}>
                {bills.map((bill) => {
                    return <BillRecord name={bill.name} date={bill.date} id={bill.id} key={bill.id}/>
                })}

            </div>
        </main>
    )
}