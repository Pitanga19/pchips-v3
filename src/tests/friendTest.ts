import FriendService from '../services/FriendService';

const applyToJSON = (result: any) => {
    result.friendModel ? result.friendModel = result.friendModel.toJSON() : null;
};

const listApplyToJSON = (list: any) => {
    list.friendModelList ? list.friendModelList = list.friendModelList.map((f: any) => f.toJSON()) : null;
};

const friendTest = async () => {
    const user2 = 2;
    const user3 = 3;
    const user4 = 4;
    const user5 = 5;

    try {
        console.log("\n\n\n[friendTest.ts] Starting tests ...");
        
        // Enviar solicitud de amistad
        console.log('\n\n\n[friendTest.ts] Sending friend requests ...');
        const sendRequestResult2to3 = await FriendService.sendFriendRequest(user2, user3);
        applyToJSON(sendRequestResult2to3);
        console.log('[friendTest.ts] Send Friend Request Result:', sendRequestResult2to3);
        const sendRequestResult2to4 = await FriendService.sendFriendRequest(user2, user4);
        applyToJSON(sendRequestResult2to4);
        console.log('[friendTest.ts] Send Friend Request Result:', sendRequestResult2to4);
        const sendRequestResult3to4 = await FriendService.sendFriendRequest(user3, user4);
        applyToJSON(sendRequestResult3to4);
        console.log('[friendTest.ts] Send Friend Request Result:', sendRequestResult3to4);
        const sendRequestResult3to5 = await FriendService.sendFriendRequest(user3, user5);
        applyToJSON(sendRequestResult3to5);
        console.log('[friendTest.ts] Send Friend Request Result:', sendRequestResult3to5);
        
        // Aceptar solicitud de amistad
        console.log('\n\n\n[friendTest.ts] Accepting friend request ...');
        const acceptRequestResult2to3 = await FriendService.acceptFriendRequest(user2, user3);
        applyToJSON(acceptRequestResult2to3);
        console.log('[friendTest.ts] Accept Friend Request Result:', acceptRequestResult2to3);
        const acceptRequestResult2to4 = await FriendService.acceptFriendRequest(user2, user4);
        applyToJSON(acceptRequestResult2to4);
        console.log('[friendTest.ts] Accept Friend Request Result:', acceptRequestResult2to4);
        
        // Obtener lista de amigos aceptados
        console.log('\n\n\n[friendTest.ts] Getting accepted friends list ...');
        const acceptedFriends2init = await FriendService.getAcceptedFriendList(user2);
        applyToJSON(acceptedFriends2init);
        listApplyToJSON(acceptedFriends2init);
        console.log('[friendTest.ts] Accepted Friends for 2:', acceptedFriends2init);
        
        // Cancelar solicitud de amistad
        console.log('\n\n\n[friendTest.ts] Canceling friend request ...');
        const cancelRequestResult = await FriendService.cancelFriendRequest(user3, user4);
        applyToJSON(cancelRequestResult);
        console.log(' Friend Request Result:', cancelRequestResult);
        
        // Rechazar solicitud de amistad
        console.log('\n\n\n[friendTest.ts] Rejecting friend request ...');
        const rejectRequestResult = await FriendService.rejectFriendRequest(user3, user5);
        applyToJSON(rejectRequestResult);
        console.log(' Friend Request Result:', rejectRequestResult);
        
        // Eliminar un amigo
        console.log('\n\n\n[friendTest.ts] Removing friend ...');
        const removeFriendResult = await FriendService.removeFriend(user2, user4);
        applyToJSON(removeFriendResult);
        console.log('[friendTest.ts] Remove Friend Result:', removeFriendResult);
        
        // Obtener lista de amigos aceptados
        console.log('\n\n\n[friendTest.ts] Getting accepted friends list ...');
        const acceptedFriends2end = await FriendService.getAcceptedFriendList(user2);
        applyToJSON(acceptedFriends2end);
        listApplyToJSON(acceptedFriends2end);
        console.log('[friendTest.ts] Accepted Friends for 2:', acceptedFriends2end);
        
        // Obtener lista de amigos aceptados
        console.log('\n\n\n[friendTest.ts] Getting accepted friends list ...');
        const acceptedFriends3 = await FriendService.getAcceptedFriendList(user3);
        applyToJSON(acceptedFriends3);
        listApplyToJSON(acceptedFriends3);
        console.log('[friendTest.ts] Accepted Friends for 3:', acceptedFriends3);
    
        console.log("\n\n\n[friendTest.ts] Tests finished.");
    } catch (error) {
        console.error('\n\n\n[friendTest.ts] An error occurred:', error);
    };
};

// Llamada a la función
export default friendTest;