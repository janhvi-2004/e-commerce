"use client";
import Card from "../components/Card/Card";
import styles from "./user.module.scss";
import { ProductProvider, useProductContext } from "../context/product.context";
function User() {
  const { products, loading } = useProductContext();

  return (
    <div className={styles.UserPage}>
      <div className={styles.ProductList}>
        {products.map((product) => (
          <Card
            _id={product._id}
            key={product._id}
            productName={product.productName}
            category={product.category}
            productImage={product.productImage}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
}

export default function UserPageWrapper() {
  return (
    <ProductProvider>
      <User />
    </ProductProvider>
  );
}
