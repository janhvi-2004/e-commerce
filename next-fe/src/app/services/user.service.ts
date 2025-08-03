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