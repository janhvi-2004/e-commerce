"use client";
import { useParams } from "next/navigation";
import {
  ProductProvider,
  useProductContext,
} from "../../context/product.context";
import { useEffect } from "react";
import styles from "./product.module.scss";
import { RiHeart2Fill } from "react-icons/ri";
import Button from "@/app/components/Button/Button";
import { useUserContext } from "@/app/context/user.context";
import UserProductProvider from "@/app/provider/user-product.provider";

function ProductPage() {
  const { addToWishlist } = useUserContext();
  const params = useParams();
  const productId = params?.productId as string;
  console.log("Product ID: in page.tsx", productId);
  const { product, getProduct } = useProductContext();
  const handleGetProduct = async () => {
    await getProduct(productId);
  };
  useEffect(() => {
    handleGetProduct();
  }, []);
  const handleWishlistProduct = async () => {
    addToWishlist(productId, "6873b3cf29cda6b888ca4fe4");
  };
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
              Wishlist{" "}
              <RiHeart2Fill size={20} style={{ verticalAlign: "middle" }} />
            </>
          }
          type={"Success"}
          onClick={handleWishlistProduct}
        />
      </div>
    </div>
  );
}

export default function ProductPageWrapper() {
  return (
    <UserProductProvider userId="6873b3cf29cda6b888ca4fe4">
      <ProductPage />
    </UserProductProvider>
  );
}
