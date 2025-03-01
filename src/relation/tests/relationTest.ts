// pchips-v3/src/relation/tests/relationTest.ts

import { RelationService } from '../relationIndex';

const applyToJSON = (result: any) => {
    result.friendModel ? result.friendModel = result.friendModel.toJSON() : null;
};

const listApplyToJSON = (list: any) => {
    list.friendModelList ? list.friendModelList = list.friendModelList.map((f: any) => f.toJSON()) : null;
};

const relationTest = async () => {
    const user2 = 2;
    const user3 = 3;
    const user4 = 4;
    const user5 = 5;

    try {
        console.log('\n\n\n[relationTest.ts] Starting tests ...');
        
        // Enviar solicitud de amistad
        console.log('\n\n\n[relationTest.ts] Sending friend requests ...');
        const sendRequestResult2to3 = await RelationService.sendFriendRequest(user2, user3);
        applyToJSON(sendRequestResult2to3);
        console.log('[relationTest.ts] Send Friend Request Result:', sendRequestResult2to3);
        const sendRequestResult2to4 = await RelationService.sendFriendRequest(user2, user4);
        applyToJSON(sendRequestResult2to4);
        console.log('[relationTest.ts] Send Friend Request Result:', sendRequestResult2to4);
        const sendRequestResult3to4 = await RelationService.sendFriendRequest(user3, user4);
        applyToJSON(sendRequestResult3to4);
        console.log('[relationTest.ts] Send Friend Request Result:', sendRequestResult3to4);
        const sendRequestResult3to5 = await RelationService.sendFriendRequest(user3, user5);
        applyToJSON(sendRequestResult3to5);
        console.log('[relationTest.ts] Send Friend Request Result:', sendRequestResult3to5);
        
        // Aceptar solicitud de amistad
        console.log('\n\n\n[relationTest.ts] Accepting friend request ...');
        const acceptRequestResult2to3 = await RelationService.acceptFriendRequest(user2, user3);
        applyToJSON(acceptRequestResult2to3);
        console.log('[relationTest.ts] Accept Friend Request Result:', acceptRequestResult2to3);
        const acceptRequestResult2to4 = await RelationService.acceptFriendRequest(user2, user4);
        applyToJSON(acceptRequestResult2to4);
        console.log('[relationTest.ts] Accept Friend Request Result:', acceptRequestResult2to4);
        
        // Obtener lista de amigos aceptados
        console.log('\n\n\n[relationTest.ts] Getting accepted friends list ...');
        const acceptedFriends2init = await RelationService.getAcceptedFriendList(user2);
        applyToJSON(acceptedFriends2init);
        listApplyToJSON(acceptedFriends2init);
        console.log('[relationTest.ts] Accepted Friends for 2:', acceptedFriends2init);
        
        // Cancelar solicitud de amistad
        console.log('\n\n\n[relationTest.ts] Canceling friend request ...');
        const cancelRequestResult = await RelationService.cancelFriendRequest(user3, user4);
        applyToJSON(cancelRequestResult);
        console.log(' Friend Request Result:', cancelRequestResult);
        
        // Rechazar solicitud de amistad
        console.log('\n\n\n[relationTest.ts] Rejecting friend request ...');
        const rejectRequestResult = await RelationService.rejectFriendRequest(user3, user5);
        applyToJSON(rejectRequestResult);
        console.log(' Friend Request Result:', rejectRequestResult);
        
        // Eliminar un amigo
        console.log('\n\n\n[relationTest.ts] Removing friend ...');
        const removeFriendResult = await RelationService.removeFriend(user2, user4);
        applyToJSON(removeFriendResult);
        console.log('[relationTest.ts] Remove Friend Result:', removeFriendResult);
        
        // Obtener lista de amigos aceptados
        console.log('\n\n\n[relationTest.ts] Getting accepted friends list ...');
        const acceptedFriends2end = await RelationService.getAcceptedFriendList(user2);
        applyToJSON(acceptedFriends2end);
        listApplyToJSON(acceptedFriends2end);
        console.log('[relationTest.ts] Accepted Friends for 2:', acceptedFriends2end);
        
        // Obtener lista de amigos aceptados
        console.log('\n\n\n[relationTest.ts] Getting accepted friends list ...');
        const acceptedFriends3 = await RelationService.getAcceptedFriendList(user3);
        applyToJSON(acceptedFriends3);
        listApplyToJSON(acceptedFriends3);
        console.log('[relationTest.ts] Accepted Friends for 3:', acceptedFriends3);
    
        console.log('\n\n\n[relationTest.ts] Tests finished.');
    } catch (error) {
        console.error('\n\n\n[relationTest.ts] An error occurred:', error);
    };
};

// Llamada a la función
export default relationTest;