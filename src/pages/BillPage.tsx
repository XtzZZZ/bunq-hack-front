import styles from '../styles/pages/BillPage.module.scss'
import {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {GoCopy} from "react-icons/go";
import { FaCheck } from 'react-icons/fa';

import Item from "../interfaces/Item.ts";
import BillList from "../components/BillList.tsx";

export default function BillPage() {
    const id = useParams().id;
    const navigate = useNavigate();
    const shareLinkRef = useRef<HTMLSpanElement>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [shareCode, setShareCode] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchBill = async () => {
            const response = await fetch(`http://138.68.73.164/api/bills/${id}`);
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

    const handleDelete = () => {
        const deleteBill = async () => {
            await fetch(`http://138.68.73.164/api/bills/${id}`, {
                method: "DELETE"
            }).then(() => {console.log("Bill deleted")}).catch(e => console.error(e));

        }
        deleteBill().then();
        navigate("/");
    }

    return (
        <main className={styles.bill_page_ctr}>
            <span className={styles.page_title}>{name}</span>

            <div className={styles.items_ctr}>
                <span className={styles.page_subtitle}>Items:</span>
                <BillList items={items}/>
                <span className={styles.page_subtitle}>Share:</span>
                <span className={styles.page_explanation}>Send this link to your friends
                    so they can pay their share.
                </span>
                <div className={styles.share_link_ctr}>
                    <span className={styles.share_link} ref={shareLinkRef} >
                        localhost:5173/shared/{shareCode}
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
                <button className={styles.back_btn} onClick={handleDelete}>Delete bill</button>
                <NavLink to="/" className={styles.back_btn}>Back to bills</NavLink>
            </div>
        </main>
    )
}