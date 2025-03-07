// pchips-v3/src/settings/core/SettingsController.ts

import { Request, Response } from 'express';
import { SettingsService, TSettingsBody, TSettingsUpdateBody } from '../configIndex';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';

class SettingsController {
    public static async create(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { gameId }: TSettingsBody = req.body;

        try {
            const { settingsModel, settingsData } = await SettingsService.create(errors, gameId);
            const expectedOk = EResponseStatus.CREATED;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async get(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { gameId }: TSettingsBody = req.body;

        try {
            const { settingsModel, settingsData } = await SettingsService.get(errors, gameId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { gameId, updates }: TSettingsUpdateBody = req.body;

        try {
            const { settingsModel, settingsData } = await SettingsService.update(errors, gameId, updates);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };
};

export default SettingsController;