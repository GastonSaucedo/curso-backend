import { Router } from "express";
import {
  deleteProductController,
  deleteCartController,
  addProductController,
  addCartController,
  getCartsController,
  getCartController,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/:cid", getCartController);
router.get("/", getCartsController);

router.post("/", addCartController);

router.post("/:cid/product/:pid", addProductController);

router.delete("/:id", deleteCartController);

//borrar producto de carrito
router.delete("/:cid/product/:pid", deleteProductController);

export default router;