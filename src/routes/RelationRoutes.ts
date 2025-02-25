// pchips-v3/src/routes/RelationRoutes.ts

import { Router, Request, Response } from 'express';
import RelationController from "../controllers/RelationController";

const router = Router();

// User sends friend request
router.post('/friend-request', async (req: Request, res: Response) => {
    await RelationController.sendFriendRequest(req, res);
});

// Sender cancels friend request
router.delete('/friend-request', async (req: Request, res: Response) => {
    await RelationController.cancelFriendRequest(req, res);
});

// Receiver accepts friend request
router.patch('/friend-request/accept', async (req: Request, res: Response) => {
    await RelationController.acceptFriendRequest(req, res);
});

// Receiver rejects friend request
router.patch('/friend-request/reject', async (req: Request, res: Response) => {
    await RelationController.rejectFriendRequest(req, res);
});

// User removes a friend
router.delete('/friend', async (req: Request, res: Response) => {
    await RelationController.removeFriend(req, res);
});

// User blocks another user
router.post('/block', async (req: Request, res: Response) => {
    await RelationController.blockUser(req, res);
});

// User unblocks another user
router.delete('/block', async (req: Request, res: Response) => {
    await RelationController.unblockUser(req, res);
});

// Get list of accepted friends
router.get('/friends/accepted-list', async (req: Request, res: Response) => {
    await RelationController.getAcceptedFriendList(req, res);
});

// Get list of pending friend requests
router.get('/friends/pending-list', async (req: Request, res: Response) => {
    await RelationController.getPendingFriendList(req, res);
});

// Get list of blocked users
router.get('/blockeds-users-list', async (req: Request, res: Response) => {
    await RelationController.getBlockedList(req, res);
});

export default router;