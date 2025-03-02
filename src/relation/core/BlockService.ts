// pchips-v3/src/relation/core/BlockService.ts

import {
    TBlockData, TBlockFindData, TBlockFindResult, TBlockList, TBlockModel, TBlockService, TRelationDelete,
} from '../relationIndex';
import {
    addToResponseErrors, TErrorList, EErrorField, EErrorMessage, showLog,
} from '../../common/commonIndex';
import { UserModel, BlockModel } from '../../../db/dbIndex';
import { TUserDataList, TUserModelList, UserService } from '../../auth/authIndex';

const file = 'BlockService';
const field = EErrorField.BLOCK

class BlockService {
    private static async findBlock(errors: TErrorList, data: TBlockFindData): Promise<TBlockFindResult> {
        const { blockerId, blockedId } = data;
        let blockModel: TBlockModel = null;
        let blockData: TBlockData = null;

        if (blockerId === blockedId) {
                    showLog(file, 'Is same ID', data, false);
                    addToResponseErrors(errors, field, EErrorMessage.SAME_USER);
        } else {
            blockModel = await BlockModel.findOne({ where: { blockerId, blockedId }});
            if (blockModel) blockData = blockModel.toJSON();
        };

        return { blockModel, blockData };
    };
    
    // Validate find result
    private static validateFindResult(errors: TErrorList, data: TBlockFindData, findResult: TBlockFindResult, shouldExists: boolean): void {
        if (shouldExists && !findResult.blockModel) {
            showLog(file, 'Block not found', data, false);
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        } else if (!shouldExists && findResult.blockModel) {
            showLog(file, 'Block already exist', data, false);
            addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXIST);
        };
    };

    private static async find(errors: TErrorList, data: TBlockFindData, shouldExists: boolean): Promise<TBlockService> {
        const findResult = await this.findBlock(errors, data);
        this.validateFindResult(errors, data, findResult, shouldExists);
        return findResult;
    };

    public static async create(errors: TErrorList, blockerId: number, blockedId: number): Promise<TBlockService> {
        const findData = { blockerId, blockedId };
        const findResult = await this.find(errors, findData, false);
        let blockModel: TBlockModel = null;
        let blockData: TBlockData = null;

        if (errors.length === 0) {
            blockModel = await BlockModel.create({ blockerId, blockedId });

            if (!blockModel) {
                showLog(file, 'Error creating block', { blockerId, blockedId }, false);
                addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
            } else {
                blockData = blockModel.toJSON();
                showLog(file, 'Block successfully created', { blockerId, blockedId }, true);
            };
        };

        return { blockModel, blockData };
    };

    public static async get(errors: TErrorList, blockerId: number, blockedId: number): Promise<TBlockService> {
        const findData = { blockerId, blockedId };
        const { blockModel, blockData } = await this.find(errors, findData, true);

        return { blockModel, blockData };
    };

    public static async getBlockedModelList(errors: TErrorList, userId: number): Promise<TBlockList>{
        const { userModel, userData } = await UserService.getById(errors, userId);
        let blockedModelList: TUserModelList = [];
        let blockedDataList: TUserDataList = [];

        const blockedList = await BlockModel.findAll({
            where: { blockerId: userId },
            include: [
                { model: UserModel, as: 'blocked', required: false },
            ],
        });

        blockedModelList = blockedList.map(b => 
            b.dataValues.blocked
        ).filter(Boolean);
        blockedDataList = blockedModelList.map(b => b.toJSON());

        showLog(file, 'Blockeds successfully loaded', blockedDataList, true);

        return { userModel, userData, blockedModelList, blockedDataList };
    };

    public static async delete(errors: TErrorList, blockerId: number, blockedId: number): Promise<TRelationDelete> {
        const getBlockResult = await this.get(errors, blockerId, blockedId);
        const { blockModel } = getBlockResult;
        let { blockData } = getBlockResult;
        let deleted: boolean = false;

        if (errors.length === 0 && blockModel && blockData) {
            showLog(file, 'Block successfully loaded', blockData, true);

            await blockModel.destroy();
            deleted = true;
            showLog(file, 'Block successfully deleted.', { blockedId, blockerId }, true);
        };

        return { deleted };
    };
};

export default BlockService;