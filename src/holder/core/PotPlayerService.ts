// pchips-v3/src/holder/core/PotPlayerService.ts

import { PlayerModel, PotPlayerModel } from "../../../db/dbIndex";
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from "../../common/commonIndex";
import { TPotPlayerData, TPotPlayerServiceData, TPotPlayerModel, TPotPlayerService, TPotPlayerDelete, PotService, TPlayerDataList, TPlayerModelList, TPotPlayers, TPlayerPots, PlayerService, TPotDataList, TPotModelList } from "../holderIndex";

class PotPlayerService {
    private static async findPotPlayer(errors: TErrorList, data: TPotPlayerServiceData): Promise<TPotPlayerService> {
        let potPlayerModel: TPotPlayerModel = null;
        let potPlayerData: TPotPlayerData = null;

        potPlayerModel = await PotPlayerModel.findOne({ where: data });
        if (potPlayerModel) {
            potPlayerData = potPlayerModel.toJSON();
        };

        return { potPlayerModel, potPlayerData };
    };

    private static validateFindResult(errors: TErrorList, findResult: TPotPlayerService, shouldExists: boolean): void {
        const field = EErrorField.POT_PLAYER;
        const { potPlayerModel } = findResult;

        if (shouldExists && !potPlayerModel) {
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        };
        if (!shouldExists && potPlayerModel) {
            addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXIST);
        };
    };

    public static async find(errors: TErrorList, data: TPotPlayerServiceData, shouldExists: boolean): Promise<TPotPlayerService> {
        const findResult = await this.findPotPlayer(errors, data);
        this.validateFindResult(errors, findResult, shouldExists);

        return findResult;
    };

    public static async create(errors: TErrorList, data: TPotPlayerServiceData): Promise<TPotPlayerService> {
        const potPlayerModel = await PotPlayerModel.create(data);
        let potPlayerData: TPotPlayerData = null;
        const findPotPlayerResult = await this.find(errors, data, false);

        if (errors.length === 0 && potPlayerModel) {
            potPlayerData = potPlayerModel.toJSON();
        } else {
            addToResponseErrors(errors, EErrorField.POT_PLAYER, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        return { potPlayerModel, potPlayerData };
    };

    public static async get(errors: TErrorList, data: TPotPlayerServiceData): Promise<TPotPlayerService> {
        return this.find(errors, data, true);
    };

    public static async getPotPlayers(errors: TErrorList, potId: number): Promise<TPotPlayers> {
        const { potModel, potData } = await PotService.get(errors, potId);
        let playerModelList: TPlayerModelList = [];
        let playerDataList: TPlayerDataList = [];

        if (errors.length === 0 && potModel) {
            const potPlayerList = await PotPlayerModel.findAll({
                where: { potId },
                include: [{ model: PlayerModel, as: 'player' }],
            });

            playerModelList = potPlayerList.map(pp => pp.dataValues.player);
            playerDataList = playerModelList.map(p => p.toJSON());
        };

        return { potModel, potData, playerModelList, playerDataList };
    };

    public static async getPlayerPots(errors: TErrorList, playerId: number): Promise<TPlayerPots> {
        const { playerModel, playerData } = await PlayerService.getById(errors, playerId);
        let potModelList: TPotModelList = [];
        let potDataList: TPotDataList = [];

        if (errors.length === 0 && playerModel) {
            const potPlayerList = await PotPlayerModel.findAll({
                where: { playerId },
                include: [{ model: PotPlayerModel, as: 'pot' }],
            });

            potModelList = potPlayerList.map(pp => pp.dataValues.pot);
            potDataList = potModelList.map(p => p.toJSON());
        };

        return { playerModel, playerData, potModelList, potDataList };
    };

    public static async delete(errors: TErrorList, data: TPotPlayerServiceData): Promise<TPotPlayerDelete> {
        const { potPlayerModel } = await this.get(errors, data);
        let deleted: boolean = false;

        if (errors.length === 0 && potPlayerModel) {
            await potPlayerModel.destroy();
            deleted = true;
        };

        return { deleted };
    };
};

export default PotPlayerService;