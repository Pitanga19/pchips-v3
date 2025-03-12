// pchips-v3/src/holder/utils/playerTypes.ts

import { IPlayer, PlayerModel } from "../../../db/dbIndex";
import { TDeleteReturn } from "../../common/commonIndex";

export type TPlayerModel = PlayerModel | null;
export type TPlayerData = IPlayer | null;

export type TPlayerModelList = PlayerModel[];
export type TPlayerDataList = IPlayer[];

export type TPlayerService = {
    playerModel: TPlayerModel,
    playerData: TPlayerData,
};

export type TPlayerDelete = TDeleteReturn;

export type TPlayerServiceData = {
    userId: number,
    roomId: number,
    tableId: number,
    chips?: number,
};