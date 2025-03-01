// pchips-v3/src/party/core/PartyController.ts

import { Request, Response } from 'express';
import {
    PartyManagementService, TPartyCreateBody, TPartyManageBody, TPartyUpdateBody, TPartyListBody, TPartyMembersBody,
} from '../partyIndex';
import { EResponseMessage } from '../../common/commonIndex';

class PartyController {
    public static async create(req: Request, res: Response): Promise<void> {
        const { partyName, userId }:TPartyCreateBody = req.body;

        try {
            const { status, party, partyUser, errors, message } = await PartyManagementService.create(partyName, userId);

            res.status(status).json({ party, partyUser, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async addUser(req: Request, res: Response): Promise<void> {
        const { actorId, partyId, targetId }:TPartyManageBody = req.body;

        try {
            const { status, party, partyUser, errors, message } = await PartyManagementService.addUser(actorId, partyId, targetId);

            res.status(status).json({ party, partyUser, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async removeUser(req: Request, res: Response): Promise<void> {
        const { actorId, partyId, targetId }:TPartyManageBody = req.body;

        try {
            const { status, party, value, errors, message } = await PartyManagementService.removeUser(actorId, partyId, targetId);

            res.status(status).json({ party, value, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async leave(req: Request, res: Response): Promise<void> {
        const { actorId, partyId }:TPartyManageBody = req.body;

        try {
            const { status, party, value, errors, message } = await PartyManagementService.leave(actorId, partyId);

            res.status(status).json({ party, value, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async assignAdmin(req: Request, res: Response): Promise<void> {
        const { actorId, partyId, targetId }:TPartyManageBody = req.body;

        try {
            const { status, party, partyUser, errors, message } = await PartyManagementService.assignAdmin(actorId, partyId, targetId);

            res.status(status).json({ party, partyUser, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async removeAdmin(req: Request, res: Response): Promise<void> {
        const { actorId, partyId, targetId }:TPartyManageBody = req.body;

        try {
            const { status, party, partyUser, errors, message } = await PartyManagementService.removeAdmin(actorId, partyId, targetId);

            res.status(status).json({ party, partyUser, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async transferOwner(req: Request, res: Response): Promise<void> {
        const { actorId, partyId, targetId }:TPartyManageBody = req.body;

        try {
            const { status, party, partyUser, errors, message } = await PartyManagementService.transferOwner(actorId, partyId, targetId);

            res.status(status).json({ party, partyUser, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async rename(req: Request, res: Response): Promise<void> {
        const { actorId, partyId, newName }:TPartyUpdateBody = req.body;

        try {
            const { status, party, partyUser, errors, message } = await PartyManagementService.rename(actorId, partyId, newName);

            res.status(status).json({ party, partyUser, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getUserAllParties(req: Request, res: Response): Promise<void> {
        const { userId }:TPartyListBody = req.body;

        try {
            const { status, user, partyList, errors, message } = await PartyManagementService.getUserAllParties(userId);

            res.status(status).json({ user, partyList, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getUserAdminParties(req: Request, res: Response): Promise<void> {
        const { userId }:TPartyListBody = req.body;

        try {
            const { status, user, partyList, errors, message } = await PartyManagementService.getUserAdminParties(userId);

            res.status(status).json({ user, partyList, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getUserOwnerParties(req: Request, res: Response): Promise<void> {
        const { userId }:TPartyListBody = req.body;

        try {
            const { status, user, partyList, errors, message } = await PartyManagementService.getUserOwnerParties(userId);

            res.status(status).json({ user, partyList, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getPartyMembers(req: Request, res: Response): Promise<void> {
        const { partyId }:TPartyMembersBody = req.body;

        try {
            const { status, party, userList, errors, message } = await PartyManagementService.getPartyMembers(partyId);

            res.status(status).json({ party, userList, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getPartyAdmins(req: Request, res: Response): Promise<void> {
        const { partyId }:TPartyMembersBody = req.body;

        try {
            const { status, party, userList, errors, message } = await PartyManagementService.getPartyAdmins(partyId);

            res.status(status).json({ party, userList, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getPartyOwners(req: Request, res: Response): Promise<void> {
        const { partyId }:TPartyMembersBody = req.body;

        try {
            const { status, party, userList, errors, message } = await PartyManagementService.getPartyOwners(partyId);

            res.status(status).json({ party, userList, errors, message });
        } catch (error) {
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };
};

export default PartyController;