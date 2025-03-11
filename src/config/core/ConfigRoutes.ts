// pchips-v3/src/config/core/ConfigRoutes.ts

import { Router, Request, Response } from 'express';
import ConfigController from './ConfigController';

const router = Router();

// Create new table
router.post('/create-table', async (req: Request, res: Response) => {
    await ConfigController.createTable(req, res);
});

// Update settings
router.patch('/settings', async (req: Request, res: Response) => {
    await ConfigController.updateSettings(req, res);
});

// Run table
router.patch('/run-table', async (req: Request, res: Response) => {
    await ConfigController.runTable(req, res);
});

// Pause table
router.patch('/pause-table', async (req: Request, res: Response) => {
    await ConfigController.pauseTable(req, res);
});

// Finish table
router.patch('/finish-table', async (req: Request, res: Response) => {
    await ConfigController.finishTable(req, res);
});