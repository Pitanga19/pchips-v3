import { showAndResetErrors, showLog, TErrorList } from '../../common/commonIndex';
import PartyManagementService from '../core/PartyManagementService';

const file = 'partyManagementTest';

const partyTest = async () => {
    console.log(`\n\n\n\n\n[${file}] Starting tests ...`);
    
    // Users id data
    const usersIds = [1, 2, 3, 4, 5];

    // Party id data
    const partyId = 1;
    
    // Global errors test
    let errors: TErrorList = [];

    // Create party
    console.log(`\n\n\n[${file}] Creating party ...`);
    const createParty = await PartyManagementService.create(errors, usersIds[0], 'Party 1');
    showLog(file, `Create party result`, createParty, true);
    errors = showAndResetErrors(errors, file);

    // Add users to party
    console.log(`\n\n\n[${file}] Adding users to party ...`);
    const addUser1 = await PartyManagementService.addUser(errors, usersIds[0], partyId, usersIds[1]);
    showLog(file, `Add user 1 to party result`, addUser1, true);
    errors = showAndResetErrors(errors, file);

    const addUser2 = await PartyManagementService.addUser(errors, usersIds[0], partyId, usersIds[2]);
    showLog(file, `Add user 2 to party result`, addUser2, true);
    errors = showAndResetErrors(errors, file);

    // Assign admin
    console.log(`\n\n\n[${file}] Assigning admin ...`);
    const assignAdmin = await PartyManagementService.assignAdmin(errors, usersIds[0], partyId, usersIds[1]);
    showLog(file, `Assign admin to user 1 result`, assignAdmin, true);
    errors = showAndResetErrors(errors, file);

    // Remove admin
    console.log(`\n\n\n[${file}] Removing admin ...`);
    const removeAdmin = await PartyManagementService.removeAdmin(errors, usersIds[0], partyId, usersIds[1]);
    showLog(file, `Remove admin from user 1 result`, removeAdmin, true);
    errors = showAndResetErrors(errors, file);

    // Transfer owner
    console.log(`\n\n\n[${file}] Transferring owner ...`);
    const transferOwner = await PartyManagementService.transferOwner(errors, usersIds[0], partyId, usersIds[1]);
    showLog(file, `Transfer owner to user 1 result`, transferOwner, true);
    errors = showAndResetErrors(errors, file);

    // Rename party
    console.log(`\n\n\n[${file}] Renaming party ...`);
    const renameParty = await PartyManagementService.update(errors, usersIds[1], partyId, { name: 'New Party Name' });
    showLog(file, `Rename party result`, renameParty, true);
    errors = showAndResetErrors(errors, file);

    // Remove user from party
    console.log(`\n\n\n[${file}] Removing user from party ...`);
    const removeUser = await PartyManagementService.removeUser(errors, usersIds[1], partyId, usersIds[2]);
    showLog(file, `Remove user 2 from party result`, removeUser, true);
    errors = showAndResetErrors(errors, file);

    // User leaves party
    console.log(`\n\n\n[${file}] User leaving party ...`);
    const leaveParty = await PartyManagementService.leave(errors, usersIds[1], partyId);
    showLog(file, `User 1 leaves party result`, leaveParty, true);
    errors = showAndResetErrors(errors, file);

    // Get user all parties
    console.log(`\n\n\n[${file}] Getting user all parties ...`);
    const userAllParties = await PartyManagementService.getUserAllParties(errors, usersIds[0]);
    showLog(file, `User 0 all parties result`, userAllParties, true);
    errors = showAndResetErrors(errors, file);

    // Get user admin parties
    console.log(`\n\n\n[${file}] Getting user admin parties ...`);
    const userAdminParties = await PartyManagementService.getUserAdminParties(errors, usersIds[0]);
    showLog(file, `User 0 admin parties result`, userAdminParties, true);
    errors = showAndResetErrors(errors, file);

    // Get user owner parties
    console.log(`\n\n\n[${file}] Getting user owner parties ...`);
    const userOwnerParties = await PartyManagementService.getUserOwnerParties(errors, usersIds[0]);
    showLog(file, `User 0 owner parties result`, userOwnerParties, true);
    errors = showAndResetErrors(errors, file);

    // Get party members
    console.log(`\n\n\n[${file}] Getting party members ...`);
    const partyMembers = await PartyManagementService.getPartyMembers(errors, partyId);
    showLog(file, `Party members result`, partyMembers, true);
    errors = showAndResetErrors(errors, file);

    // Get party admins
    console.log(`\n\n\n[${file}] Getting party admins ...`);
    const partyAdmins = await PartyManagementService.getPartyAdmins(errors, partyId);
    showLog(file, `Party admins result`, partyAdmins, true);
    errors = showAndResetErrors(errors, file);

    // Get party owners
    console.log(`\n\n\n[${file}] Getting party owners ...`);
    const partyOwners = await PartyManagementService.getPartyOwners(errors, partyId);
    showLog(file, `Party owners result`, partyOwners, true);
    errors = showAndResetErrors(errors, file);

    console.log(`\n\n\n[${file}] Tests finished.`);
};

// Llamada a la función
export default partyTest;