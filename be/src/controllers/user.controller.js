import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  if (
    [firstName, lastName, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ username });

  if (existedUser) {
    throw new ApiError(409, "User with username already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    username: username.toLowerCase(),
    password,
  });

  const createduser = await User.findById(user._id);

  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (
    [username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const userPresent = User.findOne(username);
  if (!userPresent) {
    throw new ApiError(401, "User not Registered");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User Logged In Succesfully"));
});

const wishListProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  console.log("productId", productId);

  const { _id } = req.body;
  console.log("_id", _id);

  const user = await User.findById(_id);
  console.log("user", user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }
  const index = user.wishList.indexOf(productId);
  console.log("index", index);
  if (index === -1) {
    user.wishList.push(productId);
  } else {
    user.wishList.splice(index, 1);
  }
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, user.wishList, "Wishlist updated successfully"));
});

const getWishListedProducts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const products = await User.findById(userId)
    .populate("wishList")
    .select("wishList");
  console.log("Wishlisted products", products.wishList);
  if (!products) {
    throw new ApiError(404, "No products found in wishlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products.wishList,
        "Wishlisted products fetched successfully"
      )
    );
});

export { registerUser, loginUser, wishListProduct, getWishListedProducts };
