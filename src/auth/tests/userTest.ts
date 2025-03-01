// pchips-v3/src/auth/test/userTest.ts

import { UserService } from '../authIndex';

const applyToJSON = (result: any) => {
    result.userModel ? result.userModel = result.userModel.toJSON() : null;
};

export const userTest = async () => {
    console.log('\n\n\n[userTest.ts] Starting tests ...');
    
    const users = [
        { username: 'maci', email: 'maci@test.com', password: 'test1234' },
        { username: 'luchi', email: 'luchi@test.com', password: 'test1234' },
        { username: 'tito', email: 'tito@test.com', password: 'test1234' },
        { username: 'hugo', email: 'hugo@test.com', password: 'test1234' },
        { username: 'ana', email: 'ana@test.com', password: 'test1234' },
    ];
    
    // Test creating users
    for (const user of users) {
        console.log('\n\n\n[userTest.ts] Creating User ...');
        const result = await UserService.create(user.username, user.email, user.password);
        applyToJSON(result);
        console.log('[userTest.ts] Create User:', result);
    };
    
    // Test creating a user with duplicate username
    console.log('\n\n\n[userTest.ts] Creating User with duplicate username ...');
    const duplicateUsername = await UserService.create('maci', 'newemail@test.com', 'test1234');
    applyToJSON(duplicateUsername);
    console.log('[userTest.ts] Duplicate Username:', duplicateUsername);
    
    // Test creating a user with duplicate email
    console.log('\n\n\n[userTest.ts] Creating User with duplicate email ...');
    const duplicateEmail = await UserService.create('newuser', 'maci@test.com', 'test1234');
    applyToJSON(duplicateEmail);
    console.log('[userTest.ts] Duplicate Email:', duplicateEmail);
    
    // Test retrieving users by ID
    console.log('\n\n\n[userTest.ts] Getting User by ID ...');
    const userById = await UserService.getById(1);
    applyToJSON(userById);
    console.log('[userTest.ts] Get User By ID:', userById);
    
    // Test retrieving a non-existing user by ID
    console.log('\n\n\n[userTest.ts] Getting User by non-existing ID ...');
    const nonExistentUser = await UserService.getById(999);
    applyToJSON(nonExistentUser);
    console.log('[userTest.ts] Get Non-Existent User By ID:', nonExistentUser);
    
    // Test retrieving a user by username
    console.log('\n\n\n[userTest.ts] Getting User by username ...');
    const userByUsername = await UserService.getByUsername('tito');
    const byUsernameLog = {
        status : userByUsername.status,
        userModel : userByUsername.userModel,
        errors : userByUsername.errors,
        message : userByUsername.message,
    };
    applyToJSON(byUsernameLog);
    console.log('[userTest.ts] Get User By Username:', byUsernameLog);
    
    // Test retrieving a non-existing user by username
    console.log('\n\n\n[userTest.ts] Getting User by non-existing username ...');
    const userNotFound = await UserService.getByUsername('ghost');
    applyToJSON(userNotFound);
    console.log('[userTest.ts] Get Non-Existent User By Username:', userNotFound);
    
    // Test password validation
    if (userByUsername.userModel) {
        console.log('\n\n\n[userTest.ts] Validating correct password ...');
        const validPassword = await UserService.validatePassword(userByUsername.userModel, 'test1234');
        applyToJSON(validPassword);
        console.log('[userTest.ts] Validate Correct Password:', validPassword);
        
        console.log('\n\n\n[userTest.ts] Validating incorrect password ...');
        const invalidPassword = await UserService.validatePassword(userByUsername.userModel, 'wrongpassword');
        console.log('[userTest.ts] Validate Incorrect Password:', invalidPassword);
    };
    
    // Test updating a user
    console.log('\n\n\n[userTest.ts] Updating User ...');
    const updateUser = await UserService.update(1, { username: 'newMaci', email: 'newmaci@test.com' });
    applyToJSON(updateUser);
    console.log('[userTest.ts] Update User:', updateUser);
    
    // Test updating a non-existing user
    console.log('\n\n\n[userTest.ts] Updating non-existing User ...');
    const updateNonExistent = await UserService.update(999, { username: 'noUser' });
    applyToJSON(updateNonExistent);
    console.log('[userTest.ts] Update Non-Existent User:', updateNonExistent);
    
    // Test deleting a user
    console.log('\n\n\n[userTest.ts] Deleting User ...');
    const deleteUser = await UserService.delete(1);
    console.log('[userTest.ts] Delete User:', deleteUser);
    
    // Test deleting a non-existing user
    console.log('\n\n\n[userTest.ts] Deleting non-existing User ...');
    const deleteNonExistent = await UserService.delete(999);
    console.log('[userTest.ts] Deleting Non-Existent User:', deleteNonExistent);
    
    console.log('\n\n\n[userTest.ts] Tests finished.');
};

export default userTest;