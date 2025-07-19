import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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

export { registerUser, loginUser };
