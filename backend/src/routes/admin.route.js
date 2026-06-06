import { Router } from "express";
import { createAlbum, createSong, deleteAlbum, deleteSong, checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middle.js";

const router = Router();

router.use(protectRoute, requireAdmin)

router.get("/check",  checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id",  deleteSong);

router.post("/album",  createAlbum);
router.post("/album", deleteAlbum);


export default router;