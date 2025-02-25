// pchips-v3/src/controllers/AuthController.ts

import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { TRegisterBody, TLoginBody, TRecoverBody, TModifyBody } from "../utils/types/authTypes";
import { EResponseMessage } from "../utils/enums/statusEnums";

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

    public static async modify(req: Request, res: Response): Promise<void> {
        const { id, password, updates }: TModifyBody = req.body;

        try {
            const { status, user, errors, message } = await AuthService.modify(id, password, updates);

            res.status(status).json({ user, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };
};

export default AuthController;