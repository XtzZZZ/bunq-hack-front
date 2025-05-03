import styles from '../../styles/components/BillPage/ItemRecord.module.scss';

interface ItemRecordProps {
    name: string;
    price: number | string;
    quantity: number | string;
    id?: string;
}

export default function ItemRecord({name, price, quantity, id} : Readonly<ItemRecordProps>) {
    return (
        <div className={styles.item_record_ctr} style={id === "description" ? {background: "none", height: "fit-content",
            marginBottom: "8px"} : {}}>
            <div className={styles.item_record_data}>
                <span className={styles.item_record_data_text}>
                    {name}
                </span>
                <div className={styles.item_record_data_text_ctr}>
                    <div className={styles.item_record_data_text} >
                        {quantity}
                    </div>
                    <div className={styles.item_record_data_text}>
                        {price}{typeof quantity === "string" ? "" : "€"}
                    </div>
                </div>
            </div>
        </div>
    )
}