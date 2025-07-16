import Router from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { addProduct } from "../controllers/product.controller.js";

const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);

export default router;
