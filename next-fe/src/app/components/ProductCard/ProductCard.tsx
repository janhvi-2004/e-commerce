import React from "react";
import styles from "./ProductCard.module.scss";
import type { ProductCardProps } from "./ProductCard.types";

function ProductCard({
  image,
  price,
  productCategory,
  productName,
  quantity,
}: ProductCardProps) {
  return (
    <div className={styles.ProductCard}>
      <img src={image} alt={productName} className={styles.Image}/>
      <div className={styles.Info}>
        <span className={styles.Category}>{productCategory}</span>
        <span className={styles.Quantity}>{quantity}</span>
        <span className={styles.Name}>{productName}</span>
        <span className={styles.Price}>{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
