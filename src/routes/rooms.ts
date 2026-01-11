import { Router } from "express";

import { roomsController } from "../controllers/roomsController.js";
import { roomValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.post("/createRoom", roomValidation, roomsController().create);

export default router;