// pchips-v3/src/setting/core/SettingController.ts

import { Request, Response } from 'express';
import { SettingService, TSettingBody, TSettingUpdateBody } from '../settingIndex';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';

class SettingController {
    public static async create(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { gameId }: TSettingBody = req.body;

        try {
            const { settingModel, settingData } = await SettingService.create(errors, gameId);
            const expectedOk = EResponseStatus.CREATED;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ settingModel, settingData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async get(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { gameId }: TSettingBody = req.body;

        try {
            const { settingModel, settingData } = await SettingService.get(errors, gameId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ settingModel, settingData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { gameId, updates }: TSettingUpdateBody = req.body;

        try {
            const { settingModel, settingData } = await SettingService.update(errors, gameId, updates);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ settingModel, settingData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };
};

export default SettingController;