import axiosInstance from "../axiosInstance";

export const addProduct = async (data: any) => {
  const response = await axiosInstance.post("/product/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/product/products");
  return response.data;
};

export const deleteProduct = async (_id: string) => {
  console.log("here", _id);
  const response = await axiosInstance.delete("/product/delete", {
    data: { _id },
  });
  return response.data;
};

export const updateProduct = async (data: any) => {
  const response = await axiosInstance.patch("/product/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProduct = async (productId: string) => {
  const response = await axiosInstance.get(`/product/${productId}`);
  // console.log("getProduct response:", response.data);
  return response.data;
}