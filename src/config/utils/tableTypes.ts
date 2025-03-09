// pchips-v3/src/config/utils/gameTypes.ts

import { ITable, TableModel } from "../../../db/dbIndex";
import { TDeleteReturn } from "../../common/commonIndex";

export type TTableModel = TableModel | null;
export type TTableData = ITable | null;

export type TTableModelList = TableModel[];
export type TTableDataList = ITable[];

export type TTableList = {
    tableModelList: TTableModelList;
    tableDataList: TTableDataList;
};

export type TTableService = {
    tableModel: TTableModel,
    tableData: TTableData,
};

export type TTableRoomService = {
    tableNumber: number,
};

export type TTableDelete = TDeleteReturn;

export type TTableUpdates = { isPaused: boolean };