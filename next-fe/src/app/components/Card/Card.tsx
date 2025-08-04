import Link from 'next/link';
import styles from './Card.module.scss';
import type { CardProps } from './Card.types';

function Card({productName, category, price, quantity, productImage, _id}: CardProps) {
  return (
    <Link className={styles.Card} href={`/product/${_id}`}>
      <div className={styles.Image}><img src={productImage} alt={productName}/></div>
      <div className={styles.Details}>
        <div className={styles.ProductName}>{productName}</div>
        <div className={styles.Category}>{category}</div>
        <div className={styles.PriceAndQuantity}>
          <span className={styles.Price}>{price}</span>
        <span className={styles.Quantity}>{quantity} left</span>
        </div>
      </div>
    </Link>
  )
}

export default Card
