import type { TableProps } from "./Table.types";
import styles from "./Table.module.scss";
import Button from "../Button/Button";

function Table({ caption, headers, data }: TableProps) {
  return (
    <table className={styles.Table}>
      <caption className={styles.Caption}>{caption}</caption>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={styles.HeaderCell}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex} className={styles.Row}>
            <td className={styles.Cell}>{rowData.productName}</td>
            <td className={styles.Cell}>{rowData.category}</td>
            <td className={styles.Cell}>{rowData.quantity}</td>
            <td className={styles.Cell}>₹{rowData.price}</td>
            <td className={styles.Cell}>
              <img src={rowData.productImage} alt={rowData.productName} className={styles.Image} />
            </td>
            <td className={`${styles.Cell} ${styles.Actions}`}>
              <Button text={"Update"} type={"Common"} />
              <Button text={"Delete"} type={"Error"}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
