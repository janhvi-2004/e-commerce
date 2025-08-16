import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/add")
  .post(verifyJWT, upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);

router.route("/products").get(getProducts);

router.route("/delete").delete(verifyJWT, deleteProduct);

router
  .route("/update")
  .patch(verifyJWT, upload.fields([{ name: "productImage", maxCount: 1 }]), updateProduct);

router.route("/:productId").get(getProduct);
export default router;
