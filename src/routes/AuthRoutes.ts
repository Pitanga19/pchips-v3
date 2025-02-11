// pchips-v3/src/routes/AuthRoutes.ts

import { Router, Request, Response } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import AuthController from "../controllers/AuthController";

const router = Router();

// Register route
router.post('/register', AuthMiddleware.validateRegisterInputs, async (req: Request, res: Response) => {
    await AuthController.register(req, res);
});

// Log in route
router.post('/login', AuthMiddleware.validateLoginInputs, async (req: Request, res: Response) => {
    await AuthController.login(req, res);
});

// Recover route
router.post('/recover', AuthMiddleware.validateRecoverInputs, async (req: Request, res: Response) => {
    await AuthController.recover(req, res);
});

// Modify route
router.post('/modify', AuthMiddleware.validateModifyInputs, async (req: Request, res: Response) => {
    await AuthController.modify(req, res);
});

export default router;