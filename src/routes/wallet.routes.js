import { Router } from "express";
import {
  addNewProfit,
  addNewExpense,
  showMenu,
} from "../controllers/wallet.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.post("/profit", addNewProfit);
router.post("/expense", addNewExpense);
router.get("/menu", showMenu);

export default router;
