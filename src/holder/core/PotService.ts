// pchips-v3/src/holder/core/PotService.ts

import { PotModel } from "../../../db/dbIndex";
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from "../../common/commonIndex";
import { TableService } from "../../config/configIndex";
import { TPotCreateData, TPotData, TPotDataList, TPotDelete, TPotList, TPotModel, TPotModelList, TPotService, TPotUpdates } from "../holderIndex";

class PotService {
    private static async find(errors: TErrorList, potId: number): Promise<TPotService> {
        let potModel: TPotModel = null;
        let potData: TPotData = null;
        const field = EErrorField.POT;

        potModel = await PotModel.findByPk(potId);
        if (potModel) {
            potData = potModel.toJSON()
        } else {
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        };

        return { potModel, potData };
    };

    public static async create(errors: TErrorList, data: TPotCreateData): Promise<TPotService> {
        let potModel: TPotModel = null;
        let potData: TPotData = null;

        const { tableId } = data;
        const { potDataList } = await this.getListByTable(errors, tableId);
        data.potNumber = potDataList.length + 1;

        potModel = await PotModel.create(data);
        if (potModel) {
            potData = potModel.toJSON();
        } else {
            addToResponseErrors(errors, EErrorField.POT, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        return { potModel, potData };
    };

    public static async get(errors: TErrorList, potId: number): Promise<TPotService> {
        return await this.find(errors, potId);
    };

    public static async getListByTable(errors: TErrorList, tableId: number): Promise<TPotList> {
        let potModelList: TPotModelList = [];
        let potDataList: TPotDataList = [];

        const getTableResult = await TableService.get(errors, tableId);

        if (errors.length === 0) {
            potModelList = await PotModel.findAll({ where: { tableId } });
            potDataList = potModelList.map(p => p.toJSON());
        };

        return { potModelList, potDataList };
    };

    public static async update(errors: TErrorList, potId: number, updates: TPotUpdates): Promise<TPotService> {
        const getPotResult = await this.get(errors, potId);
        const { potModel } = getPotResult;
        let { potData } = getPotResult;

        if (errors.length === 0 && potModel) {
            await potModel.update(updates);
            potData = potModel.toJSON();
        };

        return { potModel, potData };
    };

    public static async delete(errors: TErrorList, potId: number, updates: TPotUpdates): Promise<TPotDelete> {
        const { potModel }  = await this.get(errors, potId);
        let deleted: boolean = false;

        if (errors.length === 0 && potModel) {
            await potModel.update(updates);
            deleted = true;
        };

        return { deleted };
    };
};

export default PotService;