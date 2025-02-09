import express from "express";
import { getFinancialReport } from "../controllers/productController";

const router = express.Router();
router.get('/calculate',getFinancialReport);
export default router;