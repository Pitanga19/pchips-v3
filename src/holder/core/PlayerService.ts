// pchips-v3/src/holder/core/PlayerService.ts

import { EStartingChipsType, PlayerModel } from "../../../db/dbIndex";
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from "../../common/commonIndex";
import { SettingsService } from "../../config/configIndex";
import { TPlayerData, TPlayerServiceData, TPlayerModel, TPlayerService, TPlayerDelete } from "../holderIndex";

class PlayerService {
    private static async findPlayer(errors: TErrorList, data: TPlayerServiceData): Promise<TPlayerService> {
        let playerModel: TPlayerModel = null;
        let playerData: TPlayerData = null;

        playerModel = await PlayerModel.findOne({ where: data });
        if (playerModel) playerData = playerModel.toJSON();

        return { playerModel, playerData };
    };

    private static validateFindResult(errors: TErrorList, findResult: TPlayerService, shouldExist: boolean): void {
        const { playerModel } = findResult;
        const field = EErrorField.PLAYER;

        if (shouldExist && !playerModel) addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        if (!shouldExist && playerModel) addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXIST);
    };

    public static async find(errors: TErrorList, data: TPlayerServiceData, shouldExist: boolean): Promise<TPlayerService> {
        const findResult = await this.findPlayer(errors, data);
        this.validateFindResult(errors, findResult, shouldExist);

        return findResult;
    };

    public static async create(errors: TErrorList, data: TPlayerServiceData): Promise<TPlayerService> {
        let playerModel: TPlayerModel = null;
        let playerData: TPlayerData = null;

        const findPlayerResult = await this.find(errors, data, false);
        
        if (errors.length === 0) {
            const tableId = data.tableId;
            const { settingsData } = await SettingsService.get(errors, tableId);
            if (settingsData && settingsData.startingChipsType === EStartingChipsType.EQUAL) {
                data.chips = settingsData.startingChips;
            };

            playerModel = await PlayerModel.create(data);
            if (playerModel) {
                playerData = playerModel.toJSON();
            } else {
                addToResponseErrors(errors, EErrorField.PLAYER, EErrorMessage.INTERNAL_SERVER_ERROR);
            };
        };

        return { playerModel, playerData };
    };

    public static async get(errors: TErrorList, data: TPlayerServiceData): Promise<TPlayerService> {
        let playerModel: TPlayerModel = null;
        let playerData: TPlayerData = null;

        const findPlayerResult = await this.find(errors, data, true);

        if (errors.length === 0) {
            playerModel = findPlayerResult.playerModel;
            playerData = findPlayerResult.playerData;
        };

        return { playerModel, playerData };
    };

    public static async update(errors: TErrorList, data: TPlayerServiceData): Promise<TPlayerService> {
        const { playerModel } = await this.get(errors, data);
        let playerData: TPlayerData = null;

        if (errors.length === 0 && playerModel) {
            await playerModel.update(data);
            playerData = playerModel.toJSON();
        };

        return { playerModel, playerData };
    };

    public static async delete(errors: TErrorList, data: TPlayerServiceData): Promise<TPlayerDelete> {
        const { playerModel } = await this.get(errors, data);
        let deleted: boolean = false;

        if (errors.length === 0 && playerModel) {
            await playerModel.destroy();
            deleted = true;
        };

        return { deleted };
    };
};

export default PlayerService;