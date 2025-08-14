"use client";
import { useParams } from "next/navigation";
import {
  ProductProvider,
  useProductContext,
} from "../../context/product.context";
import { use, useEffect, useState } from "react";
import styles from "./product.module.scss";
import { RiHeart2Fill } from "react-icons/ri";
import Button from "@/app/components/Button/Button";
import { useUserContext } from "@/app/context/user.context";
import UserProductProvider from "@/app/provider/user-product.provider";

function ProductPage() {
  const { addToWishlist, wishlist } = useUserContext();
  const [isWishlistedProduct, setIsWishlistedProduct] = useState(false);
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

  
  useEffect(() => {
    const isWishlisted = wishlist.some((item) => item._id === productId);
    setIsWishlistedProduct(isWishlisted);
  }, [wishlist, productId, addToWishlist]);

  console.log("Is Wishlisted Product:", wishlist);

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
              {isWishlistedProduct ? "Wishlisted" : "Wishlist"}{" "}
              <RiHeart2Fill
                color={isWishlistedProduct ? "#9090f4" : "#eee"}
                size={20}
                style={{ verticalAlign: "middle" }}
              />
            </>
          }
          type={"Plain"}
          onClick={handleWishlistProduct}
          className={styles.productWishlistButton}
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
