import styles from '../../styles/components/MainPage/BillRecord.module.scss'
import {FaArrowRightLong} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

interface BillRecordProps {
    name: string;
    date: string;
    id: string;
}

export default function BillRecord({name, date, id}: Readonly<BillRecordProps>) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/bills/${id}`)
    }

    return (
        <div className={styles.bill_record_ctr} onClick={handleClick}>
            {/* TODO: add icon depending on what is the bill about */}
            <div className={styles.bill_record_data}>
                <span className={styles.data_name}>{name}</span>
                <span className={styles.data_date}>{date}</span>
            </div>
            <FaArrowRightLong className={styles.arrow_icon}/>
        </div>
    )
}