// pchips-v3/src/room/core/RoomRoutes.ts

import { Router, Request, Response } from 'express';
import { RoomController } from '../roomIndex';

const router = Router();

// Create a new room
router.post('/create', async (req: Request, res: Response) => {
    await RoomController.create(req, res);
});

// Add a user to a room
router.post('/add-user', async (req: Request, res: Response) => {
    await RoomController.addUser(req, res);
});

// Remove a user from a room
router.delete('/remove-user', async (req: Request, res: Response) => {
    await RoomController.removeUser(req, res);
});

// User leaves a room
router.post('/leave', async (req: Request, res: Response) => {
    await RoomController.leave(req, res);
});

// Assign admin to a room
router.post('/assign-admin', async (req: Request, res: Response) => {
    await RoomController.assignAdmin(req, res);
});

// Remove admin from a room
router.delete('/remove-admin', async (req: Request, res: Response) => {
    await RoomController.removeAdmin(req, res);
});

// Transfer room ownership
router.post('/transfer-owner', async (req: Request, res: Response) => {
    await RoomController.transferOwner(req, res);
});

// Rename room
router.patch('/update', async (req: Request, res: Response) => {
    await RoomController.update(req, res);
});

// Get all rooms of a user
router.get('/user-rooms', async (req: Request, res: Response) => {
    await RoomController.getUserAllRooms(req, res);
});

// Get rooms where user is admin
router.get('/user-admin-rooms', async (req: Request, res: Response) => {
    await RoomController.getUserAdminRooms(req, res);
});

// Get rooms where user is owner
router.get('/user-owner-rooms', async (req: Request, res: Response) => {
    await RoomController.getUserOwnerRooms(req, res);
});

// Get members of a room
router.get('/room-members', async (req: Request, res: Response) => {
    await RoomController.getRoomMembers(req, res);
});

// Get admins of a room
router.get('/room-admins', async (req: Request, res: Response) => {
    await RoomController.getRoomAdmins(req, res);
});

// Get owners of a room
router.get('/room-owners', async (req: Request, res: Response) => {
    await RoomController.getRoomOwners(req, res);
});

// Get tables of a room
router.get('/room-tables', async (req: Request, res: Response) => {
    await RoomController.getRoomTables(req, res);
});

export default router;