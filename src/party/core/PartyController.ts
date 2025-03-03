// pchips-v3/src/party/core/PartyController.ts

import { Request, Response } from 'express';
import {
    PartyManagementService, TPartyCreateBody, TPartyManageBody, TPartyUpdateBody, TPartyMembersBody, TPartySelfBody, TUserPartiesBody,
} from '../partyIndex';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';

class PartyController {
    public static async create(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyName }: TPartyCreateBody = req.body;

        try {
            const { actorModel, actorData, partyModel, partyData, partyActorModel, partyActorData } = await PartyManagementService.create(errors, actorId, partyName);
            const expectedOk = EResponseStatus.CREATED;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, partyModel, partyData, partyActorModel, partyActorData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async addUser(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId, targetId }: TPartyManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData } = await PartyManagementService.addUser(errors, actorId, partyId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async removeUser(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId, targetId }: TPartyManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, deleted } = await PartyManagementService.removeUser(errors, actorId, partyId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, deleted, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async leave(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId }: TPartySelfBody = req.body;

        try {
            const { actorModel, actorData, partyModel, partyData, deleted } = await PartyManagementService.leave(errors, actorId, partyId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, partyModel, partyData, deleted, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async assignAdmin(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId, targetId }: TPartyManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData } = await PartyManagementService.assignAdmin(errors, actorId, partyId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async removeAdmin(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId, targetId }: TPartyManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData } = await PartyManagementService.removeAdmin(errors, actorId, partyId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async transferOwner(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId, targetId }: TPartyManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData } = await PartyManagementService.transferOwner(errors, actorId, partyId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, partyId, updates }: TPartyUpdateBody = req.body;

        try {
            const { actorModel, actorData, partyModel, partyData, partyActorModel, partyActorData } = await PartyManagementService.update(errors, actorId, partyId, updates);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, partyModel, partyData, partyActorModel, partyActorData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getUserAllParties(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { userId }: TUserPartiesBody = req.body;

        try {
            const { userModel, userData, partyModelList, partyDataList } = await PartyManagementService.getUserAllParties(errors, userId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, partyModelList, partyDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getUserAdminParties(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { userId }: TUserPartiesBody = req.body;

        try {
            const { userModel, userData, partyModelList, partyDataList } = await PartyManagementService.getUserAdminParties(errors, userId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, partyModelList, partyDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getUserOwnerParties(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { userId }: TUserPartiesBody = req.body;

        try {
            const { userModel, userData, partyModelList, partyDataList } = await PartyManagementService.getUserOwnerParties(errors, userId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, partyModelList, partyDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getPartyMembers(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { partyId }: TPartyMembersBody = req.body;

        try {
            const { partyModel, partyData, userModelList, userDataList } = await PartyManagementService.getPartyMembers(errors, partyId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ partyModel, partyData, userModelList, userDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getPartyAdmins(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { partyId }: TPartyMembersBody = req.body;

        try {
            const { partyModel, partyData, userModelList, userDataList } = await PartyManagementService.getPartyAdmins(errors, partyId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ partyModel, partyData, userModelList, userDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getPartyOwners(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { partyId }: TPartyMembersBody = req.body;

        try {
            const { partyModel, partyData, userModelList, userDataList } = await PartyManagementService.getPartyOwners(errors, partyId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ partyModel, partyData, userModelList, userDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };
};

export default PartyController;