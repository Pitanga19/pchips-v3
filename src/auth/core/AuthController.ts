// pchips-v3/src/auth/core/AuthController.ts

import { Request, Response } from 'express';
import { AuthService, TRegisterBody, TLoginBody, TRecoverPasswordBody, TUpdateBody, TDeleteAccountBody } from '../authIndex';
import { EResponseMessage, EResponseStatus, TErrorList, handleResponseStatus } from '../../common/commonIndex';

class AuthController {
    public static async register(req: Request, res: Response): Promise<void> {
        const { username, email, password }: TRegisterBody = req.body;
        const expectedOk = EResponseStatus.CREATED;
        const errors: TErrorList = [];

        try {
            const { userModel, userData } = await AuthService.register(errors, username, email, password);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async login(req: Request, res: Response): Promise<void> {
        const { username, password }: TLoginBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { userModel, userData } = await AuthService.login(errors, username, password);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, errors });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        const { id, password, updates }: TUpdateBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { userModel, userData } = await AuthService.update(errors, id, password, updates);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, errors });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async recoverPassword(req: Request, res: Response): Promise<void> {
        const { findedType, findedValue }: TRecoverPasswordBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { userModel, userData } = await AuthService.recoverPassword(errors, findedType, findedValue);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, errors });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async deleteAccount(req: Request, res: Response): Promise<void> {
        const { id, password, safeword }: TDeleteAccountBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { deleted } = await AuthService.deleteAccount(errors, id, password, safeword);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ deleted, errors });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };
};

export default AuthController;