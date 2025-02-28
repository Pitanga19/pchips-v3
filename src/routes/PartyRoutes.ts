// pchips-v3/src/routes/PartyRoutes.ts

import { Router, Request, Response } from 'express';
import PartyController from "../controllers/PartyController";

const router = Router();

// Create a new party
router.post('/create', async (req: Request, res: Response) => {
    await PartyController.create(req, res);
});

// Add a user to a party
router.post('/add-user', async (req: Request, res: Response) => {
    await PartyController.addUser(req, res);
});

// Remove a user from a party
router.delete('/remove-user', async (req: Request, res: Response) => {
    await PartyController.removeUser(req, res);
});

// User leaves a party
router.post('/leave', async (req: Request, res: Response) => {
    await PartyController.leave(req, res);
});

// Assign admin to a party
router.post('/assign-admin', async (req: Request, res: Response) => {
    await PartyController.assignAdmin(req, res);
});

// Remove admin from a party
router.delete('/remove-admin', async (req: Request, res: Response) => {
    await PartyController.removeAdmin(req, res);
});

// Transfer party ownership
router.post('/transfer-owner', async (req: Request, res: Response) => {
    await PartyController.transferOwner(req, res);
});

// Get all parties of a user
router.get('/user-parties', async (req: Request, res: Response) => {
    await PartyController.getUserAllParties(req, res);
});

// Get parties where user is admin
router.get('/user-admin-parties', async (req: Request, res: Response) => {
    await PartyController.getUserAdminParties(req, res);
});

// Get parties where user is owner
router.get('/user-owner-parties', async (req: Request, res: Response) => {
    await PartyController.getUserOwnerParties(req, res);
});

// Get members of a party
router.get('/party-members', async (req: Request, res: Response) => {
    await PartyController.getPartyMembers(req, res);
});

// Get admins of a party
router.get('/party-admins', async (req: Request, res: Response) => {
    await PartyController.getPartyAdmins(req, res);
});

// Get owners of a party
router.get('/party-owners', async (req: Request, res: Response) => {
    await PartyController.getPartyOwners(req, res);
});

export default router;