import { Router } from "express";

import { roomsController } from "../controllers/roomsController.js";
import { createRoomValidation, updateRoomValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.get("/findAll", roomsController().findAll);
router.get("/findById", roomsController().findById);

router.post("/create", createRoomValidation, roomsController().create);

router.post("/update", updateRoomValidation, roomsController().update);

router.post("/delete", roomsController().delete);

export default router;