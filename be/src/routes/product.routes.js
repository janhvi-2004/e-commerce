import Router from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { addProduct, getProducts } from "../controllers/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);

  router.route("/products").get(getProducts)

export default router;
