// pchips-v3/src/auth/core/AuthController.ts

import { Request, Response } from 'express';
import { AuthService, TRegisterBody, TLoginBody, TRecoverBody, TUpdateBody } from '../authIndex';
import { EResponseMessage } from '../../common/commonIndex';

class AuthController {
    public static async register(req: Request, res: Response): Promise<void> {
        const { username, email, password }: TRegisterBody = req.body;

        try {
            const { status, user, errors, message } = await AuthService.register(username, email, password);

            res.status(status).json({ user, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async login(req: Request, res: Response): Promise<void> {
        const { username, password }: TLoginBody = req.body;

        try {
            const { status, user, errors, message } = await AuthService.login(username, password);

            res.status(status).json({ user, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async recover(req: Request, res: Response): Promise<void> {
        const { findedType, findedValue }: TRecoverBody = req.body;

        try {
            const { status, user, errors, message } = await AuthService.recover(findedType, findedValue);

            res.status(status).json({ user, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        const { id, password, updates }: TUpdateBody = req.body;

        try {
            const { status, user, errors, message } = await AuthService.update(id, password, updates);

            res.status(status).json({ user, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };
};

export default AuthController;