import { Router } from "express";
import { createUser, listUsers } from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const router = Router();
router.use(requireAuth);
router.get("/", requireRole("admin"), listUsers);
router.post("/", requireRole("admin"), createUser);
export default router;
