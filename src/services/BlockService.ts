// pchips-v3/src/services/BlockService.ts

import BlockModel from "../../db/models/BlockModel";
import { TErrorList } from "../utils/types/errorTypes";
import { EResponseMessage, EResponseStatus } from "../utils/enums/statusEnums";
import { TBlockModelListReturn, TBlockModelReturn, TBlockServiceReturn, TRelationDeleteReturn } from "../utils/types/relationTypes";
import { addToResponseErrors } from "../utils/errorUtils";
import { EErrorField, EErrorMessage } from "../utils/enums/errorEnums";
import UserModel from "../../db/models/UserModel";

class BlockService {
    private static async find(blockerId: number, blockedId: number, errors: TErrorList): Promise<TBlockModelReturn> {
        const field = EErrorField.RELATIONSHIP;
        let blockModel: TBlockModelReturn = null;

        if (blockerId === blockedId) {
            console.log(`[BlockService] Is same ID: ${blockerId}`);
            addToResponseErrors(errors, field, EErrorMessage.SAME_USER);
        } else {
            blockModel = await BlockModel.findOne({ where: { blockerId, blockedId } });
        };

        return blockModel;
    };

    public static async create(blockerId: number, blockedId: number): Promise<TBlockServiceReturn> {
        const errors: TErrorList = [];
        const field = EErrorField.RELATIONSHIP;
        let status: EResponseStatus = EResponseStatus.CREATED;
        let message: EResponseMessage = EResponseMessage.CREATED;
        let blockModel: TBlockModelReturn = await this.find(blockerId, blockedId, errors);

        if (errors.length === 0) {
            blockModel = await BlockModel.create({ blockerId, blockedId });
        };

        if (!blockModel) {
            status = EResponseStatus.INTERNAL_SERVER_ERROR;
            message = EResponseMessage.INTERNAL_SERVER_ERROR;
            console.log(`[BlockService] Error creating Block: ${blockerId} - ${blockedId}`);
            addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        return { status, blockModel, errors, message };
    };

    public static async get(blockerId: number, blockedId: number): Promise<TBlockServiceReturn> {
        let status: EResponseStatus = EResponseStatus.SUCCESS;
        let message: EResponseMessage = EResponseMessage.SUCCESS;
        const errors: TErrorList = [];
        const field = EErrorField.RELATIONSHIP;
        const blockModel = await this.find(blockerId, blockedId, errors);

        if (!blockerId) {
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.NOT_FOUND;
            console.log(`[BlockService] Block not found: ${blockerId} - ${blockedId}`);
            addToResponseErrors(errors, field, EErrorMessage.RELATIONSHIP_NOT_FOUND);
        };

        return { status, blockModel, errors, message };
    };

    public static async getBlockedModelList(blockerId: number): Promise<TBlockModelListReturn>{
        const errors: TErrorList = [];
        let status: EResponseStatus = EResponseStatus.SUCCESS;
        let message: EResponseMessage = EResponseMessage.SUCCESS;
        let blockedModelList: UserModel[] = [];

        const blockList = await BlockModel.findAll({
            where: { blockerId },
            include: [
                { model: UserModel, as: "blocked", required: false },
            ],
        });

        blockedModelList = blockList.map(b => 
            b.dataValues.blocked
        ).filter(Boolean);

        console.log('[BlockService] Blocked users succesfully loaded\n', { status, blockedModelList: blockedModelList.map(b => b.toJSON()), errors, message });

        return { status, blockedModelList, errors, message };
    };

    public static async delete(blockerId: number, blockedId: number): Promise<TRelationDeleteReturn> {
        let getBlockResult: TBlockServiceReturn = await this.get(blockerId, blockedId);
        let status: EResponseStatus = getBlockResult.status;
        let blockModel: TBlockModelReturn = getBlockResult.blockModel;
        let errors: TErrorList = getBlockResult.errors;
        let message: EResponseMessage = getBlockResult.message;
        let value: boolean = false;

        if (errors.length === 0 && blockModel) {
            await blockModel.destroy();
            value = true;
        };

        return { status, value, errors, message };
    };
};

export default BlockService;