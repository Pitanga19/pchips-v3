// pchips-v3/src/routes/AuthRoutes.ts

import { Router, Request, Response } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import AuthController from "../controllers/AuthController";

const router = Router();

// Register new user
router.post('/register', AuthMiddleware.validateRegisterInputs, async (req: Request, res: Response) => {
    await AuthController.register(req, res);
});

// LogIn existing user
router.post('/login', AuthMiddleware.validateLoginInputs, async (req: Request, res: Response) => {
    await AuthController.login(req, res);
});

// Recover forgoted password
router.post('/recover-password', AuthMiddleware.validateRecoverInputs, async (req: Request, res: Response) => {
    await AuthController.recover(req, res);
});

// Update user info (username, email, password)
router.put('/update-user', AuthMiddleware.validateUpdateInputs, async (req: Request, res: Response) => {
    await AuthController.update(req, res);
});

export default router;