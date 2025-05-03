import styles from "../styles/pages/SharedPage.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Item from "../interfaces/Item.ts";
import BillList from "../components/BillList.tsx";

export default function SharedPage() {
    const { code } = useParams();
    const [itemsTotal, setItemsTotal] = useState<Item[]>([]);
    const [isUploading, setIsUploading] = useState(false); // State to track upload progress
    const [yourItems, setYourItems] = useState<Item[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch(`http://138.68.73.164/api/shared/${code}`);
            const data = await response.json();
            setItemsTotal(data.allItems);
        };
        getItems().then();
    }, [code]);

    const handleChoosePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFilesChange = async () => {
        const files = fileInputRef.current?.files;

        if (files && files.length > 0) {
            setIsUploading(true);

            const formData = new FormData();
            for (const file of Array.from(files)) {
                formData.append("order", file); // Append each file with the key "order"
            }

            try {
                const response = await fetch(
                    `http://138.68.73.164/api/shared/${code}/match`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    alert("Failed to upload order photos.");
                    return;
                }

                // Successfully matched items
                const data = await response.json();
                setYourItems(data);
                let total = 0;
                for (const item of data) {
                    total += item.price;
                }
                setAmount(total);

            } catch (error) {
                console.error("Error uploading order photos:", error);
                alert("An error occurred while uploading. Please try again.");
            } finally {
                setIsUploading(false);
            }
        }
    };



    const defineContent = () => {
        if (yourItems !== undefined && yourItems.length > 0) {

            const handlePay = () => {
                const getLink = async () => {
                    await fetch(`http://138.68.73.164/api/shared/${code}/pay/${amount}`)
                }
                getLink().then();
                navigate("/payment");
            }

            return (
                <>
                    <BillList items={yourItems} />
                    <button className={styles.shared_page_btn} onClick={handlePay}>
                        Pay {amount}€
                    </button>
                </>
            )
        } else {
            return null;
        }
    }

    return (
        <main className={styles.shared_page_ctr}>
            <span className={styles.page_title}>What Did You Eat?</span>
            <div className={styles.page_content}>
                <span className={styles.page_subtitle}>
                    Upload photos of your meal and we’ll match them with the receipt.
                </span>

                {/* Hidden file input for multiple photos */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    multiple // Allow selection of multiple files
                    onChange={handleFilesChange} // Automatically handle upload after selection
                />

                <button
                    className={styles.shared_page_btn}
                    onClick={handleChoosePhotoClick}
                    disabled={isUploading} // Disable button during an upload process
                >
                    {isUploading ? "Uploading..." : "Upload food photos"}
                </button>


                {defineContent()}


                <span className={styles.page_subtitle}>
                    This is what the group paid.
                </span>
                <BillList items={itemsTotal} />
            </div>
        </main>
    );
}