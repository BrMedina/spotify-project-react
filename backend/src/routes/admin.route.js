import { Router } from "express";
import { createSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middle.js";

const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);


export default router;