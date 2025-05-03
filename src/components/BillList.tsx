import styles from "../styles/components/BillList.module.scss";
import ItemRecord from "./BillPage/ItemRecord.tsx";
import Item from "../interfaces/Item.ts";

interface BillListProps {
    items: Item[];
}

export default function BillList({items} : Readonly<BillListProps>) {
    return (
        <div className={styles.items_list_ctr}>
            <ItemRecord name={"Name"} price={"Price"} quantity={"Quantity"} id={"description"}/>
            {items.map((item) => {
                return <ItemRecord name={item.name} price={item.price} quantity={item.quantity} key={item.id}/>
            })}

        </div>

    )
}