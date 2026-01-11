import { Router } from "express";

import { appointmentsController } from "../controllers/appointmentsController.js";
import { appointMentsValidation } from "../middlewares/validationMiddlewares.js";

const router = Router();

router.post("/createHourly", appointMentsValidation, appointmentsController().create);

export default router;