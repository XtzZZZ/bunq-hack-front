import styles from '../styles/pages/BillPage.module.scss'
import {useEffect, useRef, useState} from "react";
import ItemRecord from "../components/BillPage/ItemRecord.tsx";
import {NavLink, useParams} from "react-router-dom";
import {GoCopy} from "react-icons/go";
import { FaCheck } from 'react-icons/fa';

interface Item {
    id: string; // Unique identifier for the item
    name: string; // Name of the item, e.g., "California Roll"
    price: number; // Price of the item
    quantity: number; // Quantity of the item purchased
    assignedToUserId: string | null; // User ID if the item is assigned to a user, null otherwise
    matched: boolean; // Whether the item has been matched
}

export default function BillPage() {
    const id = useParams().id;
    const shareLinkRef = useRef<HTMLSpanElement>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [shareCode, setShareCode] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchBill = async () => {
            const response = await fetch(`http://localhost:8080/api/bills/${id}`);
            const data = await response.json();
            setItems(data.allItems);
            setName(data.name);
            setShareCode(data.shareCode);
        };
        fetchBill().then();
    }, [id]);
    const handleCopy = () => {
        const shareLinkText = shareLinkRef.current?.textContent ?? "";

        // Copy the share link to the clipboard
        navigator.clipboard
            .writeText(shareLinkText)
            .then(() => {
                console.log("Copied to clipboard:", shareLinkText);
                // Update the state to indicate the link has been copied
                setIsCopied(true);
            })
            .catch((err) => console.error("Failed to copy:", err));
    };


    return (
        <main className={styles.bill_page_ctr}>
            <span className={styles.page_title}>{name}</span>

            <div className={styles.items_ctr}>
                <span className={styles.page_subtitle}>Items:</span>

                <ItemRecord name={"Name"} price={"Price"} quantity={"Quantity"} id={"description"}/>
                <div className={styles.items_list_ctr}>
                    {items.map((item) => {
                        return <ItemRecord name={item.name} price={item.price} quantity={item.quantity} key={item.id}/>
                    })}
                </div>
                <span className={styles.page_subtitle}>Share:</span>
                <span className={styles.page_explanation}>Send this link to your friends
                    so they can pay their share.
                </span>
                <div className={styles.share_link_ctr}>
                    <span className={styles.share_link} ref={shareLinkRef} >
                        {shareCode}
                    </span>
                    <button
                        className={styles.copy_btn}
                        onClick={handleCopy}
                    >
                        {isCopied ? (
                            <>
                                Copied <FaCheck />
                            </>
                        ) : (
                            <>
                                Copy <GoCopy />
                            </>
                        )}
                    </button>
                </div>
                <NavLink to="/" className={styles.back_btn}>Back to bills</NavLink>
            </div>
        </main>
    )
}