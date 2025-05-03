import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/CreateBillPage.module.scss";

export default function CreateBillPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>(""); // State to store the name input
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null); // State for uploaded file name
    const navigate = useNavigate();

    // Trigger file picker
    const handleChoosePhotoClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file input change
    const handleFileChange = () => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            setUploadedFileName(file.name); // Update state with file name
        }
    };

    // Primary form submission
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Prevent submission if already in progress
        if (isSubmitting) return;

        // Validate name field
        if (!name.trim()) {
            alert("Please enter a valid name.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Step 1: Send the name to create a new bill
            const createBillResponse = await fetch("http://138.68.73.164/api/bills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (!createBillResponse.ok) {
                throw new Error("Failed to create bill.");
            }

            const { id: billId } = await createBillResponse.json();

            // Step 2: Validate the file existence before uploading
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                alert("Bill created! You must upload an image next.");
                navigate(`/bills/${billId}`); // Redirect to the bill details page
                return;
            }

            // Step 3: Upload the image to the newly created bill
            const formData = new FormData();
            formData.append("receipt", file);

            const uploadReceiptResponse = await fetch(
                `http://138.68.73.164/api/bills/${billId}/receipts`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadReceiptResponse.ok) {
                throw new Error("Failed to upload receipt.");
            }


            navigate(`/bills/${billId}`);
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                alert(error.message ?? "An error occurred. Please try again.");
            } else {
                alert("An error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={styles.create_bill_page_ctr}>
            <span className={styles.page_title}>Create a New Bill</span>

            {/* Form with Name Input and File Upload */}
            <form onSubmit={handleFormSubmit} className={styles.bill_form}>

            {/* Name Input */}
                <label htmlFor="billName" className={styles.page_subtitle}>
                    Bill Name:
                </label>
                <input
                    id="billName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.name_input}
                    placeholder="Enter bill name..."
                    required
                />

                {/* File Upload Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    id="fileInput"
                    onChange={handleFileChange} // File change handler
                />

                {/* File Upload Button */}
                <label htmlFor="fileInput" className={styles.page_subtitle}>Upload a receipt:</label>
                <button
                    type="button"
                    onClick={handleChoosePhotoClick}
                    className={styles.form_btn}
                >
                    Choose a File
                </button>

                {/* Display uploaded file name */}
                {uploadedFileName && (
                    <span className={styles.upload_feedback}>1 file uploaded</span>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={styles.submit_btn}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>

            </form>
        </main>
    );
}