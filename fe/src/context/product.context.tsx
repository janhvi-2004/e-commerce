import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchProducts,
  addProduct as apiAddProduct,
  deleteProduct as apiDeleteProduct,
  updateProduct as apiUpdateProduct,
} from "../services/product.service";

import type { ProductCardProps } from "../components/ProductCard/ProductCard.types";

interface ProductContextType {
  products: ProductCardProps[];
  loading: boolean;
  addProduct: (data: FormData) => Promise<void>;
  deleteProduct: (_id: string) => Promise<void>;
  updateProduct: (data: FormData) => Promise<void>;
  refetch: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (data: FormData) => {
    setLoading(true);
    try {
      await apiAddProduct(data);
      await loadProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (_id: string) => {
    setLoading(true);
    try {
      await apiDeleteProduct(_id);
      await loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (data: FormData) => {
    setLoading(true);
    try {
      await apiUpdateProduct(data);
      await loadProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        deleteProduct,
        updateProduct,
        refetch: loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};