import Router from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct, deleteProduct, getProducts } from "../controllers/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);

router.route("/products").get(getProducts);

router.route("/delete").delete(deleteProduct);

export default router;
