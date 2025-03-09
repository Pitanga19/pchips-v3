// pchips-v3/src/config/core/TableService.ts

import { ETableStatus, TableModel } from '../../../db/dbIndex';
import { TTableData, TTableDelete, TTableModel, TTableRoomService, TTableService, TTableUpdates } from '../configIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from '../../common/commonIndex';
import { RoomManagementService } from '../../room/roomIndex';

class TableService {
    public static async find(errors: TErrorList, tableId: number, expectedExists: boolean): Promise<TTableModel> {
        const tableModel = await TableModel.findByPk(tableId);

        if (!tableModel && expectedExists) {
            console.log(`Table not found: tableId: ${tableId}`);
            const field = EErrorField.TABLE;
            const message = EErrorMessage.NOT_FOUND;
            addToResponseErrors(errors, field, message);
        } else if (tableModel && !expectedExists) {
            console.log(`Table already exists: tableId: ${tableId}`);
            const field = EErrorField.TABLE;
            const message = EErrorMessage.ALREADY_EXIST;
            addToResponseErrors(errors, field, message);
        };

        return tableModel;
    };

    private static async getTableNumber(errors: TErrorList, roomId: number): Promise<TTableRoomService> {
        const { tableModelList } = await RoomManagementService.getRoomTables(errors, roomId);
        const tableNumbers = tableModelList.map(t => t.status !== ETableStatus.FINISHED ? t.tableNumber : null);

        let tableNumber = 1;
        while (tableNumbers.includes(tableNumber)) tableNumber++;

        return { tableNumber };
    };

    public static async create(errors: TErrorList, roomId: number): Promise<TTableService> {
        const { tableNumber } = await this.getTableNumber(errors, roomId);
        let tableModel: TTableModel = null;
        let tableData: TTableData = null;

        if (errors.length === 0) {
            tableModel = await TableModel.create({ roomId, tableNumber });

            if (tableModel) {
                tableData = tableModel.toJSON();
            } else {
                console.log(`Table not created: roomId: ${roomId}`);
                const field = EErrorField.TABLE;
                const message = EErrorMessage.INTERNAL_SERVER_ERROR;
                addToResponseErrors(errors, field, message);
            };
        };

        return { tableModel, tableData };
    };

    public static async get(errors: TErrorList, tableId: number): Promise<TTableService> {
        const tableModel = await this.find(errors, tableId, true);
        let tableData: TTableData = null;

        if (tableModel) {
            tableData = tableModel.toJSON();
        };

        return { tableModel, tableData };
    };

    public static async update(errors: TErrorList, tableId: number, updates: TTableUpdates): Promise<TTableService> {
        const getTableResult = await this.get(errors, tableId);
        const { tableModel } = getTableResult;
        let { tableData } = getTableResult;

        if (errors.length === 0 && tableModel) {
            await tableModel.update(updates);
            tableData = tableModel.toJSON();
        };

        return { tableModel, tableData };
    };

    public static async delete(errors: TErrorList, tableId: number): Promise<TTableDelete> {
        const tableModel = await this.find(errors, tableId, true);
        let deleted = false;

        if (errors.length === 0 && tableModel) {
            tableModel.destroy();
            deleted = true;
        };

        return { deleted };
    };
};

export default TableService;