import axiosInstance from "../axiosInstance";

export const registerUser = async (data: any) => {
  const response = await axiosInstance.post("/user/register", data);
  return response.data;
};

export const loginUser = async (data: any) => {
    const response = await axiosInstance.post("/user/login", data);
    return response.data;
}

export const getWishlist = async (userId: string) => { 
  const response = await axiosInstance.get(`/user/wishlist/${userId}`);
  return response.data.data;
}

export const addToWishlist = async (userId: string, productId: string) => { 
  const response = await axiosInstance.post(`user/wishlist/${productId}`, { userId });
  return response.data;
}