// pchips-v3/src/party/test/partyTest.ts

import { PartyService, PartyUserService } from '../partyIndex';

export const partyTest = async () => {
    console.log('\n\n\n[partyTest.ts] Starting tests ...');
    const users = [2, 3, 4, 5, 6];
    
    console.log('\n\n\n[partyTest.ts] Creating test party ...');
    const { partyModel } = await PartyService.create('test');
    await PartyService.create('other party');
    await PartyService.create('some party');
    console.log(`Party succesfully created: ${JSON.stringify(partyModel)}`);
    
    console.log('\n\n\n[partyTest.ts] Creating partyUsers ...');
    for (const u of users) {
        const { partyUserModel } = await PartyUserService.create(1, u);
        await PartyUserService.create(2, u);
        await PartyUserService.create(3, u);
        console.log(`[partyTest.ts] PartyUser succesfully created: ${JSON.stringify(partyUserModel)}\n`);
    };
    
    console.log('\n\n\n[partyTest.ts] Listing user 2 parties ...');
    const conditionsUserParties = { userId: 2, isOwner: false, isAdmin: false };
    const { partyModelList } = await PartyUserService.getUserParties(conditionsUserParties);
    console.log(`[partyTest.ts] Party list for user 2: ${JSON.stringify(partyModelList)}`)
    
    console.log('\n\n\n[partyTest.ts] Listing test party users ...');
    const conditionsPartyUsers = { partyId: 1, isOwner: false, isAdmin: false };
    const { userModelList } = await PartyUserService.getPartyUsers(conditionsPartyUsers);
    console.log(`[partyTest.ts] User list for party test: ${JSON.stringify(userModelList)}`)

    console.log('\n\n\n[partyTest.ts] Test finished.');
};

export default partyTest;