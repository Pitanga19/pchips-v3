// pchips-v3/src/relation/tests/${file}

import { showLog, TErrorList } from '../../common/commonIndex';
import { RelationService } from '../relationIndex';

const file = 'relationTest';

const relationTest = async () => {
    console.log(`\n\n\n\n\n[${file}] Starting tests ...`);
    
    // Users id data
    const usersIds = [1, 2, 3, 4, 5];
    
    // Global errors test
    const errors: TErrorList = [];

    // Send friend requests
    console.log(`\n\n\n[${file}] Sending friend requests ...`);
    const sendFriendRequest1to2 = await RelationService.sendFriendRequest(errors, usersIds[0], usersIds[1]);
    showLog(file, `Send friend request 1 to 2 result`, sendFriendRequest1to2, true);

    const sendFriendRequest1to3 = await RelationService.sendFriendRequest(errors, usersIds[0], usersIds[2]);
    showLog(file, `Send friend request 1 to 3 result`, sendFriendRequest1to3, true);

    const sendFriendRequest2to3 = await RelationService.sendFriendRequest(errors, usersIds[1], usersIds[2]);
    showLog(file, `Send friend request 2 to 3 result`, sendFriendRequest2to3, true);

    const sendFriendRequest3to4 = await RelationService.sendFriendRequest(errors, usersIds[2], usersIds[3]);
    showLog(file, `Send friend request 3 to 4 result`, sendFriendRequest3to4, true);

    const sendFriendRequest3to5 = await RelationService.sendFriendRequest(errors, usersIds[2], usersIds[4]);
    showLog(file, `Send friend request 3 to 5 result`, sendFriendRequest3to5, true);

    const sendFriendRequest4to5 = await RelationService.sendFriendRequest(errors, usersIds[3], usersIds[4]);
    showLog(file, `Send friend request 4 to 5 result`, sendFriendRequest4to5, true);

    // Accept friend requests
    console.log(`\n\n\n[${file}] Accepting friend request ...`);
    const acceptFriendRequest1to3 = await RelationService.acceptFriendRequest(errors, usersIds[0], usersIds[2]);
    showLog(file, `Accept friend request 1 to 3 result`, acceptFriendRequest1to3, true);

    const acceptFriendRequest2to3 = await RelationService.acceptFriendRequest(errors, usersIds[1], usersIds[2]);
    showLog(file, `Accept friend request 2 to 3 result`, acceptFriendRequest2to3, true);

    const acceptFriendRequest3to4 = await RelationService.acceptFriendRequest(errors, usersIds[2], usersIds[3]);
    showLog(file, `Accept friend request 3 to 4 result`, acceptFriendRequest3to4, true);

    // Reject friend requests
    console.log(`\n\n\n[${file}] Rejecting friend request ...`);
    const rejectFriendRequest4to5 = await RelationService.rejectFriendRequest(errors, usersIds[3], usersIds[4]);
    showLog(file, `Reject friend request 4 to 5 result`, rejectFriendRequest4to5, true);
    
    // Cancel friend request
    console.log(`\n\n\n[${file}] Canceling friend request ...`);
    const cancelFriendRequest1to2 = await RelationService.cancelFriendRequest(errors, usersIds[0], usersIds[1]);
    showLog(file, `Cancel friend request 1 to 2 result`, cancelFriendRequest1to2, true);
    
    // Remove friend
    console.log(`\n\n\n[${file}] Removing friend ...`);
    const removeFriend2to3 = await RelationService.removeFriend(errors, usersIds[1], usersIds[2]);
    showLog(file, `Remove friend 2 to 3 result`, removeFriend2to3, true);
    
    // Get accepted friends list
    console.log(`\n\n\n[${file}] Getting accepted friends list ...`);
    const acceptedFriendsFor3 = await RelationService.getAcceptedFriendList(errors, usersIds[2]);
    showLog(file, `Accepted friends for 3 result`, acceptedFriendsFor3, true);
    
    // Get pending friends list
    console.log(`\n\n\n[${file}] Getting pending friends list ...`);
    const pendingFriendsFor3 = await RelationService.getPendingFriendList(errors, usersIds[2]);
    showLog(file, `Pending friends for 3 result`, pendingFriendsFor3, true);

    // Block user
    console.log(`\n\n\n[${file}] Blocking user ...`);
    const block2to3 = await RelationService.blockUser(errors, usersIds[1], usersIds[2]);
    showLog(file, `Block user 2 to 3 result`, block2to3, true);

    const block3to2 = await RelationService.blockUser(errors, usersIds[2], usersIds[1]);
    showLog(file, `Block user 3 to 2 result`, block3to2, true);

    const block3to4 = await RelationService.blockUser(errors, usersIds[2], usersIds[3]);
    showLog(file, `Block user 3 to 4 result`, block3to4, true);

    const block3to5 = await RelationService.blockUser(errors, usersIds[2], usersIds[4]);
    showLog(file, `Block user 3 to 5 result`, block3to5, true);

    // Unblock user
    console.log(`\n\n\n[${file}] Unlocking user ...`);
    const unblock3to5 = await RelationService.unblockUser(errors, usersIds[2], usersIds[4]);
    showLog(file, `Unlock user 3 to 5 result`, unblock3to5, true);
    
    // Get blocked users list
    console.log(`\n\n\n[${file}] Getting blocked users list ...`);
    const blockedUsersFor3 = await RelationService.getBlockedList(errors, usersIds[2]);
    showLog(file, `Blocked users for 3 result`, blockedUsersFor3, true);

    console.log(`\n\n\n[${file}] Tests finished.`);
};

// Llamada a la función
export default relationTest;