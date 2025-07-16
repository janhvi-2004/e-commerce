import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { productName, category, price, quantity } = req.body;
  if (
    [productName, category, price, quantity].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const imageLocalPath = req.files?.productImage[0]?.path;
  console.log("local", imageLocalPath);

  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image?.url) {
    throw new ApiError(400, "Image upload failed");
  }

  const product = await Product.create({
    productName,
    category,
    price,
    quantity,
    productImage: image.url || "",
  });

  const createdProduct = await Product.findById(product._id);

  if (!createdProduct) {
    throw new ApiError(
      500,
      "Something went wrong while registering the product"
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdProduct, "Product added successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {});

const updateProduct = asyncHandler(async (req, res) => {});

export { addProduct };
