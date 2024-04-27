import { Router } from "express";
import { uploader, validateModifiedData } from "../../utils.js";
import { validateFormData } from "../../utils.js";
import {
  getProductController,
  getProductsController,
  addProductController,
  updateProductController,
  deleteCategoryController,
  deleteProductController,
  addImageController,
} from "../controllers/product.controller.js";
const router = Router();

router.get("/", getProductsController);
router.get("/:id", getProductController);

router.post(
  "/",
  uploader.single("imagen"),
  validateFormData,
  addProductController
);

router.delete("/:id", deleteProductController);

router.put("/:id", validateModifiedData, updateProductController);

router.put("/:id/categoria/:cate", deleteCategoryController);

router.post(
  "/imagenes/",
  uploader.single("imagen"),
  validateModifiedData,
  addImageController
);
export default router;