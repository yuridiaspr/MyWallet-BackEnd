import { Router } from "express";
import {
  signUp,
  signIn,
  deleteSession,
} from "../controllers/users.controller.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.middleware.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.middleware.js";

const router = Router();

router.post("/signup", signUpBodyValidation, signUp);
router.post("/", signInBodyValidation, signIn);
router.delete("/menu", deleteSession);

export default router;
