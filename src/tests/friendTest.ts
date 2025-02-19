import FriendService from '../services/FriendService';

const friendTest = async () => {
    const senderId = 1;
    const receiverId = 2;

    try {
        // Enviar solicitud de amistad
        console.log('\n\n[friendTest.ts] Sending friend request...');
        const sendRequestResult = await FriendService.sendFriendRequest(senderId, receiverId);
        console.log('[friendTest.ts] Send Friend Request Result:', sendRequestResult);

        // Aceptar solicitud de amistad
        console.log('\n\n[friendTest.ts] Accepting friend request...');
        const acceptRequestResult = await FriendService.acceptFriendRequest(senderId, receiverId);
        console.log('[friendTest.ts] Accept Friend Request Result:', acceptRequestResult);

        // Obtener lista de amigos aceptados
        console.log('\n\n[friendTest.ts] Getting accepted friends list...');
        const acceptedFriends = await FriendService.getAcceptedFriendModelList(senderId);
        console.log('[friendTest.ts] Accepted Friends:', acceptedFriends);

        // Cancelar solicitud de amistad
        console.log('\n\n[friendTest.ts] Canceling friend request...');
        const cancelRequestResult = await FriendService.cancelFriendRequest(senderId, receiverId);
        console.log('Cancel Friend Request Result:', cancelRequestResult);

        // Eliminar un amigo
        console.log('\n\n[friendTest.ts] Removing friend...');
        const removeFriendResult = await FriendService.removeFriend(senderId, receiverId);
        console.log('[friendTest.ts] Remove Friend Result:', removeFriendResult);

    } catch (error) {
        console.error('[friendTest.ts] An error occurred:', error);
    }
}

// Llamada a la función
export default friendTest;