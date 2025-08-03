import { createContext, useContext, useEffect, useState } from "react";

import { getWishlist } from "../services/user.service";

import type { ProductCardProps } from "../components/ProductCard/ProductCard.types";

interface UserContextType {
  wishlist: ProductCardProps[];
  loading: boolean;
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

  return (
    <UserContext.Provider value={{ wishlist, loading }}>
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
