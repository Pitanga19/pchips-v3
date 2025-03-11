// pchips-v3/src/config/core/ConfigController.ts

import { Request, Response } from 'express';
import { ConfigService, TConfigBody, TConfigCreateBody, TConfigUpdateBody } from '../configIndex';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';

class ConfigController {
    public static async createTable(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];

        try {
            const { roomId }: TConfigCreateBody = req.body;
            const { tableModel, tableData, settingsModel, settingsData } = await ConfigService.createTable(errors, roomId);
            
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ tableModel, tableData, settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async updateSettings(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];

        try {
            const { tableId, updates }: TConfigUpdateBody = req.body;
            const { tableModel, tableData, settingsModel, settingsData } = await ConfigService.updateSettings(errors, tableId, updates);
            
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ tableModel, tableData, settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async runTable(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];

        try {
            const { tableId }: TConfigBody = req.body;
            const { tableModel, tableData, settingsModel, settingsData } = await ConfigService.runTable(errors, tableId);
            
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ tableModel, tableData, settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async pauseTable(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];

        try {
            const { tableId }: TConfigBody = req.body;
            const { tableModel, tableData, settingsModel, settingsData } = await ConfigService.pauseTable(errors, tableId);
            
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ tableModel, tableData, settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async finishTable(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];

        try {
            const { tableId }: TConfigBody = req.body;
            const { tableModel, tableData, settingsModel, settingsData } = await ConfigService.finishTable(errors, tableId);
            
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            
            res.status(status).json({ tableModel, tableData, settingsModel, settingsData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };
};

export default ConfigController;