import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("Generating tokens for user:", user.username);
    if (!user) {
      throw new ApiError(404, "User not found for token generation");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

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

// generate access and refresh token
console.log("Generating tokens for user:", userPresent.username);
  // const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
  //   userPresent._id
  // );

  const loggedInUser = await User.findById(userPresent._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Succesfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const wishListProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  console.log("productId", productId);

  const { userId } = req.body;

  const user = await User.findById(userId);
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

export { registerUser, loginUser, wishListProduct, getWishListedProducts, refreshAccessToken };
