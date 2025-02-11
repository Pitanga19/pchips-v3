// pchips-v3/src/controllers/AuthController.ts

import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { TAuthServiceReturn, TRegisterBody, TLoginBody, TRecoverBody, TModifyBody } from "../utils/types/authTypes";
import { EAuthResponse } from "../utils/enums/authEnums";

class AuthController {
    public static async register(req: Request, res: Response): Promise<void> {
        const { username, email, password }: TRegisterBody = req.body;

        try {
            const authRegisterResult: TAuthServiceReturn = await AuthService.register(username, email, password);
            const status = authRegisterResult.status;
            const user = authRegisterResult.user;
            const errors = authRegisterResult.errors;
            const message = authRegisterResult.message;

            res.status(status).json({ user, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EAuthResponse.INTERNAL_SERVER_ERROR });
        };
    };

    public static async login(req: Request, res: Response): Promise<void> {
        const { username, password }: TLoginBody = req.body;

        try {
            const authLoginResult: TAuthServiceReturn = await AuthService.login(username, password);
            const status = authLoginResult.status;
            const user = authLoginResult.user;
            const errors = authLoginResult.errors;
            const message = authLoginResult.message;

            res.status(status).json({ user, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EAuthResponse.INTERNAL_SERVER_ERROR });
        };
    };

    public static async recover(req: Request, res: Response): Promise<void> {
        const { findedType, findedValue }: TRecoverBody = req.body;

        try {
            const authRecoverResult: TAuthServiceReturn = await AuthService.recover(findedType, findedValue);
            const status = authRecoverResult.status;
            const user = authRecoverResult.user;
            const errors = authRecoverResult.errors;
            const message = authRecoverResult.message;

            res.status(status).json({ user, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EAuthResponse.INTERNAL_SERVER_ERROR });
        };
    };

    public static async modify(req: Request, res: Response): Promise<void> {
        const { id, password, updates }: TModifyBody = req.body;

        try {
            const authModifyResult: TAuthServiceReturn = await AuthService.modify(id, password, updates);
            const status = authModifyResult.status;
            const user = authModifyResult.user;
            const errors = authModifyResult.errors;
            const message = authModifyResult.message;

            res.status(status).json({ user, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EAuthResponse.INTERNAL_SERVER_ERROR });
        };
    };
};

export default AuthController;