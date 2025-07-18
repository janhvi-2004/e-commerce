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
