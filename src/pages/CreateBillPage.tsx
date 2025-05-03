import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/CreateBillPage.module.scss";

export default function CreateBillPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Function to trigger file picker
    const handleChoosePhotoClick = () => {
        fileInputRef.current?.click(); // Simulates a click on the hidden file input
    };

    // Function to handle file selection and upload
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get a selected file
        if (!file) return;

        // Create form data with the selected file
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Send the file to the backend
            const response = await fetch("http://localhost:8080/api/bills", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload file");
            }

            // Assume backend returns a JSON with an ID or similar data
            const data = await response.json();

            // Navigate to the new page (assumes data.id exists in response)
            navigate(`/bills/${data.id}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file. Please try again.");
        }
    };

    return (
        <main className={styles.create_bill_page_ctr}>
            <span className={styles.page_title}>Upload to Create Bill</span>

            <div>

            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <button
                className={styles.upload_btn}
                onClick={handleChoosePhotoClick}
            >
                Choose photo
            </button>
        </main>
    );
}