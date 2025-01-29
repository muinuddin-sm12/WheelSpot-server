import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";

const router = Router();

router.post('/register', validateRequest(UserValidation.userValidationSchema), AuthController.register)
router.post('/login', validateRequest(AuthValidations.loginValidationSchema), AuthController.login);
router.post('/change-password', AuthController.changePassword);

export const AuthRoutes = router;