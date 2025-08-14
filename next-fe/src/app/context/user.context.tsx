import { createContext, useContext, useEffect, useState } from "react";

import {
  getWishlist,
  addToWishlist as apiAddToWishlist,
} from "../services/user.service";

import type { ProductCardProps } from "../components/ProductCard/ProductCard.types";

interface UserContextType {
  wishlist: ProductCardProps[];
  loading: boolean;
  addToWishlist: (productId: string, userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [wishlist, setWishlist] = useState<ProductCardProps[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const loadWishlist = async (userId: string) => {
    setLoading(true);
    try {
      const productsInWishlist = await getWishlist(userId);
      setWishlist(productsInWishlist);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadWishlist(userId);
    }
  }, [userId]);

  const addToWishlist = async (productId: string, userId: string) => {
    console.log("Adding to wishlist in context:", productId, userId);
    try {
      const updatedWishlist = await apiAddToWishlist(userId, productId);
      setWishlist((prevWishlist) => [...prevWishlist, updatedWishlist.data]);
      console.log("Product added to wishlist:", updatedWishlist);
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
    }
  };

  return (
    <UserContext.Provider value={{ wishlist, loading, addToWishlist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
