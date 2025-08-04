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

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  console.log("id to delete", _id);

  if (!_id) {
    throw new ApiError(400, "Product Id is required");
  }
  const productToDelete = await Product.findByIdAndDelete(_id);
  console.log("product to delete", productToDelete);

  if (!productToDelete) {
    throw new ApiError(404, "Product not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, deleteProduct, "Product deleted successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productName, category, price, quantity } = req.body;
  console.log("update product", req.body);

  if (
    [productName, category, price, quantity].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const imageLocalPath = req.files?.productImage[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image?.url) {
    throw new ApiError(400, "Image upload failed");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.body?._id,
    {
      $set: {
        productName: productName,
        category: category,
        price: price,
        quantity: quantity,
        productImage: image.url || "",
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product Details updated successfully"
      )
    );
});

const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  console.log("productId", productId);
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }
  const product = await Product.findById(productId);
  console.log("product", product);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

export { addProduct, getProducts, deleteProduct, updateProduct, getProduct };
