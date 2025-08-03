import Router from "express";

import { loginUser, registerUser, wishListProduct, getWishListedProducts } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/wishlist/:productId").post(wishListProduct);
router.route("/wishlist/:userId").get(getWishListedProducts);

export default router;