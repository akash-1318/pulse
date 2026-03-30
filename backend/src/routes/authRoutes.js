import { Router } from "express";
import { login, me, registerOrganizationAdmin } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.post("/register", registerOrganizationAdmin);
router.post("/login", login);
router.get("/me", requireAuth, me);
export default router;
