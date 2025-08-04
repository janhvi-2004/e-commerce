"use client";
import { useParams } from "next/navigation";
import {
  ProductProvider,
  useProductContext,
} from "../../context/product.context";
import { useEffect } from "react";
import styles from "./product.module.scss";
import { get } from "http";
import { RiHeart2Fill } from "react-icons/ri";
import Button from "@/app/components/Button/Button";

function ProductPage() {
  const params = useParams();
  const productId = params?.productId as string;
  const { product, getProduct } = useProductContext();
  const handleGetProduct = async () => {
    await getProduct(productId);
  };
  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div className={styles.productPage}>
      <div className={styles.Image}>
        <img src={product?.productImage} alt={product?.productName} />
      </div>
      <div className={styles.productDetails}>
        <h1>{product?.productName}</h1>
        <p>{product?.quantity}</p>
        <p>Price: ${product?.price}</p>
        <Button
          text={
            <>
              Wishlist <RiHeart2Fill size={20} style={{ verticalAlign: "middle" }} />
            </>
          }
          type={"Success"}
        />
      </div>
    </div>
  );
}

export default function ProductPageWrapper() {
  return (
    <ProductProvider>
      <ProductPage />
    </ProductProvider>
  );
}
