import { showAndResetErrors, showLog, TErrorList } from '../../common/commonIndex';
import RoomManagementService from '../core/RoomManagementService';

const file = 'roomManagementTest';

const roomTest = async () => {
    console.log(`\n\n\n\n\n[${file}] Starting tests ...`);
    
    // Users id data
    const usersIds = [1, 2, 3, 4, 5];

    // Room id data
    const roomId = 1;
    
    // Global errors test
    let errors: TErrorList = [];

    // Create room
    console.log(`\n\n\n[${file}] Creating room ...`);
    const createRoom = await RoomManagementService.create(errors, usersIds[0], 'Room 1');
    showLog(file, `Create room result`, createRoom, true);
    errors = showAndResetErrors(errors, file);

    // Add users to room
    console.log(`\n\n\n[${file}] Adding users to room ...`);
    const addUser1 = await RoomManagementService.addUser(errors, usersIds[0], roomId, usersIds[1]);
    showLog(file, `Add user 1 to room result`, addUser1, true);
    errors = showAndResetErrors(errors, file);

    const addUser2 = await RoomManagementService.addUser(errors, usersIds[0], roomId, usersIds[2]);
    showLog(file, `Add user 2 to room result`, addUser2, true);
    errors = showAndResetErrors(errors, file);

    // Assign admin
    console.log(`\n\n\n[${file}] Assigning admin ...`);
    const assignAdmin = await RoomManagementService.assignAdmin(errors, usersIds[0], roomId, usersIds[1]);
    showLog(file, `Assign admin to user 1 result`, assignAdmin, true);
    errors = showAndResetErrors(errors, file);

    // Remove admin
    console.log(`\n\n\n[${file}] Removing admin ...`);
    const removeAdmin = await RoomManagementService.removeAdmin(errors, usersIds[0], roomId, usersIds[1]);
    showLog(file, `Remove admin from user 1 result`, removeAdmin, true);
    errors = showAndResetErrors(errors, file);

    // Transfer owner
    console.log(`\n\n\n[${file}] Transfering owner ...`);
    const transferOwner = await RoomManagementService.transferOwner(errors, usersIds[0], roomId, usersIds[1]);
    showLog(file, `Transfer owner to user 1 result`, transferOwner, true);
    errors = showAndResetErrors(errors, file);

    // Rename room
    console.log(`\n\n\n[${file}] Renaming room ...`);
    const renameRoom = await RoomManagementService.update(errors, usersIds[1], roomId, { name: 'New Room Name' });
    showLog(file, `Rename room result`, renameRoom, true);
    errors = showAndResetErrors(errors, file);

    // Remove user from room
    console.log(`\n\n\n[${file}] Removing user from room ...`);
    const removeUser = await RoomManagementService.removeUser(errors, usersIds[1], roomId, usersIds[2]);
    showLog(file, `Remove user 2 from room result`, removeUser, true);
    errors = showAndResetErrors(errors, file);

    // User leaves room
    console.log(`\n\n\n[${file}] User leaving room ...`);
    const userLeaveRoom = await RoomManagementService.leave(errors, usersIds[0], roomId);
    showLog(file, `User 1 leaves room result`, userLeaveRoom, true);
    errors = showAndResetErrors(errors, file);

    // Owner leaves room
    console.log(`\n\n\n[${file}] Owner leaving room ...`);
    const ownerLeaveRoom = await RoomManagementService.leave(errors, usersIds[1], roomId);
    showLog(file, `User 1 leaves room result`, ownerLeaveRoom, false);
    errors = showAndResetErrors(errors, file);

    // Get user all rooms
    console.log(`\n\n\n[${file}] Getting user all rooms ...`);
    const userAllRooms = await RoomManagementService.getUserAllRooms(errors, usersIds[0]);
    showLog(file, `User 0 all rooms result`, userAllRooms, true);
    errors = showAndResetErrors(errors, file);

    // Get user admin rooms
    console.log(`\n\n\n[${file}] Getting user admin rooms ...`);
    const userAdminRooms = await RoomManagementService.getUserAdminRooms(errors, usersIds[0]);
    showLog(file, `User 0 admin rooms result`, userAdminRooms, true);
    errors = showAndResetErrors(errors, file);

    // Get user owner rooms
    console.log(`\n\n\n[${file}] Getting user owner rooms ...`);
    const userOwnerRooms = await RoomManagementService.getUserOwnerRooms(errors, usersIds[0]);
    showLog(file, `User 0 owner rooms result`, userOwnerRooms, true);
    errors = showAndResetErrors(errors, file);

    // Get room members
    console.log(`\n\n\n[${file}] Getting room members ...`);
    const roomMembers = await RoomManagementService.getRoomMembers(errors, roomId);
    showLog(file, `Room members result`, roomMembers, true);
    errors = showAndResetErrors(errors, file);

    // Get room admins
    console.log(`\n\n\n[${file}] Getting room admins ...`);
    const roomAdmins = await RoomManagementService.getRoomAdmins(errors, roomId);
    showLog(file, `Room admins result`, roomAdmins, true);
    errors = showAndResetErrors(errors, file);

    // Get room owners
    console.log(`\n\n\n[${file}] Getting room owners ...`);
    const roomOwners = await RoomManagementService.getRoomOwners(errors, roomId);
    showLog(file, `Room owners result`, roomOwners, true);
    errors = showAndResetErrors(errors, file);

    console.log(`\n\n\n[${file}] Tests finished.`);
};

// Llamada a la función
export default roomTest;