// pchips-v3/src/party/core/PartyService.ts

import { TPartyData, TPartyDelete, TPartyModel, TPartyService, TPartyUpdates } from '../partyIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, showLog, TErrorList } from '../../common/commonIndex';
import { PartyModel } from '../../../db/dbIndex';

const file = 'PartyService';
const field = EErrorField.PARTY;

class PartyService {
    private static async find(errors: TErrorList, id: number, shouldExist: boolean): Promise<TPartyService> {
        const partyModel: TPartyModel = await PartyModel.findByPk(id);
        let partyData: TPartyData = null;

        if (partyModel) {
            partyData = partyModel.toJSON();
            if (!shouldExist) showLog(file, 'Party already exists', partyData, false);
        } else if (shouldExist && !partyModel) {
            showLog(file, 'Party not found', { id }, false);
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        };

        return { partyModel, partyData };
    };

    public static async create(errors: TErrorList, name: string): Promise<TPartyService> {
        const partyModel: TPartyModel = await PartyModel.create({ name });
        let partyData: TPartyData = null;

        if (partyModel) {
            partyData = partyModel.toJSON();
            showLog(file, 'Party successfully created', partyData, true);
        } else {
            showLog(file, 'Error creating party', { name }, false);
            addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        return { partyModel, partyData };
    };

    public static async get(errors: TErrorList, id: number): Promise<TPartyService> {
        const findResult = await this.find(errors, id, true);
        const { partyModel, partyData } = findResult;

        if (errors.length === 0 && partyData) {
            showLog(file, 'Party successfully retrieved', partyData, true);
        };

        return { partyModel, partyData };
    };

    public static async update(errors: TErrorList, id: number, updates: TPartyUpdates): Promise<TPartyService> {
        const getPartyResult = await this.get(errors, id);
        const { partyModel } = getPartyResult;
        let { partyData } = getPartyResult;

        if (errors.length === 0 && partyModel && partyData) {
            await partyModel.update(updates);
            partyData = partyModel.toJSON();
            showLog(file, 'Party successfully updated', partyData, true);
        };

        return { partyModel, partyData };
    };

    public static async delete(errors: TErrorList, id: number): Promise<TPartyDelete> {
        const getPartyResult = await this.get(errors, id);
        const { partyModel } = getPartyResult;
        let { partyData } = getPartyResult;
        let deleted = false;

        if (errors.length === 0 && partyModel && partyData) {
            await partyModel.destroy();
            deleted = true;
            showLog(file, 'Party successfully deleted', partyData, true);
        };

        return { deleted };
    };
};

export default PartyService;