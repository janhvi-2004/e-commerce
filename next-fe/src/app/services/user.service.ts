import axiosInstance from "../axiosInstance";

export const registerUser = async (data: any) => {
  const response = await axiosInstance.post("/user/register", data);
  console.log(response)
  return response.data;
};

export const loginUser = async (data: any) => {
    const response = await axiosInstance.post("/user/login", data);
    return response.data;
}

export const getWishlist = async (userId: string) => { 
  const response = await axiosInstance.get(`/user/wishlist/${userId}`);
  console.log("Wishlist response:", response.data.data);
  return response.data.data;
}

export const addToWishlist = async (userId: string, productId: string) => { 
  console.log("Adding to wishlist in service:", userId, productId);
  const response = await axiosInstance.post(`user/wishlist/${productId}`, { userId });
  console.log("Add to wishlist response:", response.data);
  return response.data;
}