import { Router } from "express";
import {
  getCategoriesController,
  addCategoryController,
} from "../controllers/category.controller.js";
const router = Router();

router.get("/", getCategoriesController);

router.post("/", addCategoryController);
export default router;