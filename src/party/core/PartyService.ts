// pchips-v3/src/party/core/PartyService.ts

import { TPartyDeleteReturn, TPartyModelReturn, TPartyServiceReturn } from '../partyIndex';
import { EResponseMessage, EResponseStatus, TErrorList } from '../../common/commonIndex';
import { PartyModel } from '../../../db/dbIndex';

class PartyService {
    public static async create(name: string): Promise<TPartyServiceReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.CREATED;
        let message = EResponseMessage.CREATED;

        const partyModel: TPartyModelReturn = await PartyModel.create({ name });

        if (!partyModel) {
            console.log(`[PartyService] Error creating party: ${name}`);
            status = EResponseStatus.INTERNAL_SERVER_ERROR;
            message = EResponseMessage.INTERNAL_SERVER_ERROR;
        } else {
            console.log(`[PartyService] Successfully create party: ${name}`);
        };

        return { status, partyModel, errors, message };
    };

    public static async get(id: number): Promise<TPartyServiceReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;

        const partyModel: TPartyModelReturn = await PartyModel.findByPk(id);

        if (!partyModel) {
            console.log(`[PartyService] Party not found: ${id}`);
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.INVALID_DATA;
        } else {
            console.log(`[PartyService] Successfully get party: ${partyModel.name}`);
        };

        return { status, partyModel, errors, message };
    };

    public static async rename(id: number, name: string): Promise<TPartyServiceReturn> {
        const { status, partyModel, errors, message } = await this.get(id);
        
        if (partyModel) {
            const oldName: string = partyModel.name;
            await partyModel.update({ name });
            console.log(`[PartyService] Successfully rename party: ${oldName} to ${name}`);
        };

        return { status, partyModel, errors, message };
    };

    public static async delete(id: number): Promise<TPartyDeleteReturn> {
        const { status, partyModel, errors, message } = await this.get(id);
        let value: boolean = false;
        
        if (partyModel) {
            const partyName: string = partyModel.name;
            await partyModel.destroy();
            value = true;
            console.log(`[PartyService] Successfully delete party: ${partyName}`);
        };

        return { status, value, errors, message };
    };
};

export default PartyService;