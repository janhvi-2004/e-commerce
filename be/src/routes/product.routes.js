import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);

router.route("/products").get(getProducts);

router.route("/delete").delete(deleteProduct);

router
  .route("/update")
  .patch(upload.fields([{ name: "productImage", maxCount: 1 }]), updateProduct);
export default router;
