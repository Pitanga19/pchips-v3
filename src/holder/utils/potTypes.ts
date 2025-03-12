// pchips-v3/src/holder/utils/potTypes.ts

import { IPot, PotModel } from "../../../db/dbIndex";
import { TDeleteReturn } from "../../common/commonIndex";

export type TPotModel = PotModel | null;
export type TPotData = IPot | null;

export type TPotModelList = PotModel[];
export type TPotDataList = IPot[];

export type TPotService = {
    potModel: TPotModel,
    potData: TPotData,
};

export type TPotList = {
    potModelList: TPotModelList,
    potDataList: TPotDataList,
};

export type TPotDelete = TDeleteReturn;

export type TPotCreateData = {
    tableId: number,
    potNumber?: number,
};

export type TPotUpdates = Partial<{
    isActive: boolean,
    chips: number,
}>;