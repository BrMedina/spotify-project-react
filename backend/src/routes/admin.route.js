import { Router } from "express";
import { createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middle.js";

const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);

router.post("/album", protectRoute, requireAdmin, createAlbum);
router.post("/album", protectRoute, requireAdmin, deleteAlbum);


export default router;