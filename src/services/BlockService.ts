// pchips-v3/src/services/BlockService.ts

import BlockModel from "../../db/models/BlockModel";
import { TErrorList } from "../utils/types/errorTypes";
import { EResponseMessage, EResponseStatus } from "../utils/enums/statusEnums";
import { TBlockModelReturn, TBlockServiceReturn, TRelationshipDeleteReturn } from "../utils/types/relationshipTypes";
import { addToResponseErrors } from "../utils/errorUtils";
import { EErrorField, EErrorMessage } from "../utils/enums/errorEnums";

class BlockService {
    public static async get(blockerId: number, blockedId: number, shouldExists: boolean, errors: TErrorList, status: EResponseStatus, message: EResponseMessage): Promise<TBlockModelReturn> {
        const field = EErrorField.RELATIONSHIP;
        let blockModel: TBlockModelReturn = null;

        if (blockerId === blockedId) {
            console.log(`[BlockService] Is same ID: ${blockerId}`);
            status = EResponseStatus.CONFLICT;
            message = EResponseMessage.INVALID_DATA;
            addToResponseErrors(errors, field, EErrorMessage.SAME_USER);
        } else {
            blockModel = await BlockModel.findOne({ where: { blockerId, blockedId } });
        };

        if (shouldExists && !blockModel) {
            console.log(`[BlockService] Block not found: ${blockerId} - ${blockedId}`);
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.NOT_FOUND;
            addToResponseErrors(errors, field, EErrorMessage.BLOCK_NOT_FOUND);
        };

        if (!shouldExists && blockModel) {
            console.log(`[BlockService] Block already exists: ${blockerId} - ${blockedId}`);
            status = EResponseStatus.CONFLICT;
            message = EResponseMessage.INVALID_DATA;
            addToResponseErrors(errors, field, EErrorMessage.EXISTING_BLOCK);
            blockModel = null;
        };

        return blockModel;
    };

    public static async create(blockerId: number, blockedId: number): Promise<TBlockServiceReturn> {
        const errors: TErrorList = [];
        const field = EErrorField.RELATIONSHIP;
        let status: EResponseStatus = EResponseStatus.CREATED;
        let message: EResponseMessage = EResponseMessage.CREATED;
        let blockModel: TBlockModelReturn = await this.get(blockerId, blockedId, false, errors, status, message);

        if (errors.length === 0) {
            blockModel = await BlockModel.create({ blockerId, blockedId });
        };

        if (!blockModel) {
            status = EResponseStatus.INTERNAL_SERVER_ERROR;
            message = EResponseMessage.INTERNAL_SERVER_ERROR;
            addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        return { status, blockModel, errors, message };
    };

    public static async delete(blockerId: number, blockedId: number): Promise<TRelationshipDeleteReturn> {
        const errors: TErrorList = [];
        let status: EResponseStatus = EResponseStatus.CREATED;
        let message: EResponseMessage = EResponseMessage.CREATED;
        let blockModel: TBlockModelReturn = await this.get(blockerId, blockedId, false, errors, status, message);
        let value: boolean = false;

        if (errors.length === 0 && blockModel) {
            await blockModel.destroy();
            value = true;
        };

        return { status, value, errors, message };
    };
};

export default BlockService;