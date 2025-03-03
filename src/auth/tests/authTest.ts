// pchips-v3/src/auth/test/authTest.ts

import { showAndResetErrors, showLog, TErrorList } from '../../common/commonIndex';
import { AuthService, EUserFindType } from '../authIndex';

const file = 'authTest';

export const authTest = async () => {
    console.log(`\n\n\n\n\n[${ file }] Starting AuthService tests ...`);
    
    // Example users data
    const users = [
        { username: `maci`, email: `maci@test.com`, password: `test1234` },
        { username: `luchi`, email: `luchi@test.com`, password: `test1234` },
        { username: `tito`, email: `tito@test.com`, password: `test1234` },
        { username: `hugo`, email: `hugo@test.com`, password: `test1234` },
        { username: `ana`, email: `ana@test.com`, password: `test1234` },
    ];

    // Global errors test
    let errors: TErrorList = [];
    
    // Test register users
    console.log(`\n\n\n[${ file }] Registering Users ...`);
    for (const user of users) {
        const { username, email, password } = user;
        const validRegister = await AuthService.register(errors, username, email, password);
        const success = validRegister.userData ? true : false;
        showLog(file, `Valid register`, validRegister, success);
        errors = showAndResetErrors(errors, file);
    };
    
    // Test duplicate registration (username)
    console.log(`\n\n\n[${ file }] Registering User with duplicate username ...`);
    const duplicateUsername = await AuthService.register(errors, `maci`, `newemail@test.com`, `test1234`);
    showLog(file, `Duplicate username`, duplicateUsername, false);
    errors = showAndResetErrors(errors, file);
    
    // Test duplicate registration (email)
    console.log(`\n\n\n[${ file }] Registering User with duplicate email ...`);
    const duplicateEmail = await AuthService.register(errors, `newuser`, `maci@test.com`, `test1234`);
    showLog(file, `Duplicate email`, duplicateEmail, false);
    errors = showAndResetErrors(errors, file);
    
    // Test login with correct credentials
    console.log(`\n\n\n[${ file }] Logging in with correct credentials ...`);
    const validLogin = await AuthService.login(errors, `maci`, `test1234`);
    showLog(file, `Valid login`, validLogin, true);
    errors = showAndResetErrors(errors, file);
    
    // Test login with incorrect password
    console.log(`\n\n\n[${ file }] Logging in with incorrect password ...`);
    const invalidLogin = await AuthService.login(errors, `maci`, `wrongpassword`);
    showLog(file, `Invalid login`, invalidLogin, false);
    errors = showAndResetErrors(errors, file);
    
    // Test login with non-existent user
    console.log(`\n\n\n[${ file }] Logging in with non-existent user ...`);
    const nonExistentLogin = await AuthService.login(errors, `ghost`, `test1234`);
    showLog(file, `Non-Existent login`, nonExistentLogin, false);
    errors = showAndResetErrors(errors, file);
    
    // Test password recovery by username
    console.log(`\n\n\n[${ file }] Recovering password by username ...`);
    const recoverByUsername = await AuthService.recoverPassword(errors, EUserFindType.USERNAME, `maci`);
    showLog(file, `Recover by username`, recoverByUsername, true);
    errors = showAndResetErrors(errors, file);
    
    // Test password recovery by email
    console.log(`\n\n\n[${ file }] Recovering password by email ...`);
    const recoverByEmail = await AuthService.recoverPassword(errors, EUserFindType.EMAIL, `maci@test.com`);
    showLog(file, `Recover by email`, recoverByEmail, true);
    errors = showAndResetErrors(errors, file);
    
    // Test password recovery for non-existent user
    console.log(`\n\n\n[${ file }] Recovering password for non-existent user ...`);
    const recoverNonExistent = await AuthService.recoverPassword(errors, EUserFindType.USERNAME, `ghost`);
    showLog(file, `Recover Non-Existent user`, recoverNonExistent, false);
    errors = showAndResetErrors(errors, file);

    console.log(`\n\n\n[${ file }] AuthService tests finished.`);
};

export default authTest;