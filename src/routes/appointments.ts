import { Router } from "express";

import { appointmentsController } from "../controllers/appointmentsController.js";
import { appointMentsValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.get("/findAll", appointmentsController().findAll);
router.get("/findByDate", appointmentsController().findByDate);
router.get("/findFutureByRoomId", appointmentsController().findFutureByRoomId);

router.post("/create", appointMentsValidation, appointmentsController().create);

router.post("/delete", appointmentsController().delete);

export default router;