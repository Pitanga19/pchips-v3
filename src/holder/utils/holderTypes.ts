// pchips-v3/src/holder/utils/playerTypes.ts

import { IPotPlayer, PotPlayerModel } from "../../../db/dbIndex";
import { TDeleteReturn } from "../../common/commonIndex";
import { TPlayerData, TPlayerDataList, TPlayerModel, TPlayerModelList } from "./playerTypes";
import { TPotData, TPotDataList, TPotModel, TPotModelList } from "./potTypes";

export type TPotPlayerModel = PotPlayerModel | null;
export type TPotPlayerData = IPotPlayer | null;

export type TPotPlayerService = {
    potPlayerModel: TPotPlayerModel,
    potPlayerData: TPotPlayerData,
};

export type TPotPlayers = {
    potModel: TPotModel,
    potData: TPotData,
    playerModelList: TPlayerModelList,
    playerDataList: TPlayerDataList,
};

export type TPlayerPots = {
    playerModel: TPlayerModel,
    playerData: TPlayerData,
    potModelList: TPotModelList,
    potDataList: TPotDataList,
};

export type TPotPlayerDelete = TDeleteReturn;

export type TPotPlayerServiceData = {
    potId: number,
    playerId: number,
};