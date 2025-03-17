import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middlewares.js";
import {upload} from "../middlewares/multer.middleware.js";
import {
    getAllReport,
    publishReport,
    updateReport,
    deleteReport,
} from "../controllers/report.controller.js";

const router = Router();

router.route("/").get(getAllReport);

//secure routes
router.use(verifyJWT);
router
    .route("/publishReport")
    .post(
        isAdmin,
        upload.fields([
            { name: "reportFile", maxCount: 1 },
        ]),
        publishReport
    );

router
    .route("/:reportId")
    .put(updateReport)
    .delete(deleteReport);

export default router;
