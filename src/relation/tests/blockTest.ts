// pchips-v3/src/relation/tests/blockTest.ts

import { BlockService } from '../relationIndex';

const applyToJSON = (result: any) => {
    result.blockModel ? result.blockModel = result.blockModel.toJSON() : null;
};

const listApplyToJSON = (list: any) => {
    list.blockedModelList ? list.blockedModelList = list.blockedModelList.map((b: any) => b.toJSON()) : null;
};

const blockTest = async () => {
    
    const user3 = 3;
    const user4 = 4;
    const user5 = 5;

    try {
        console.log('\n\n\n[blockTest.ts] Starting tests ...');

        console.log('\n\n\n[blockTest.ts] Creating blocks ...');
        const createBlockResult3to4 = await BlockService.create(user3, user4);
        applyToJSON(createBlockResult3to4);
        console.log('[blockTest.ts] Creating block user3 to user4 result:', createBlockResult3to4);
        const createBlockResult3to5 = await BlockService.create(user3, user5);
        applyToJSON(createBlockResult3to5);
        console.log('[blockTest.ts] Creating block user3 to user5 result:', createBlockResult3to5);

        console.log('\n\n\n[blockTest.ts] Getting blocks ...');
        const getBlockListResult = await BlockService.getBlockedModelList(user3);
        listApplyToJSON(getBlockListResult);
        console.log('[blockTest.ts] Blocked list for user3 result:', getBlockListResult);

        console.log('\n\n\n[blockTest.ts] Deleting block ...');
        const deleteBlockResult = await BlockService.delete(user3, user4);
        applyToJSON(deleteBlockResult);
        console.log('[blockTest.ts] Delte block user3 to user4 result:', deleteBlockResult);

        console.log('\n\n\n[blockTest.ts] Getting blocks ...');
        const getBlockListResultFinal = await BlockService.getBlockedModelList(user3);
        listApplyToJSON(getBlockListResultFinal);
        console.log('[blockTest.ts] Blocked list for user3 final result:', getBlockListResultFinal);
    
        console.log('\n\n\n[blockTest.ts] Tests finished.');
    } catch (error) {
        console.error('\n\n\n[blockTest.ts] An error occurred:', error);
    };
};

export default blockTest;