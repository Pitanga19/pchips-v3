import AuthService from "../services/AuthService";
import { EUserFind } from "../utils/enums/authEnums";

export const authTest = async () => {
    console.log("[authTest.ts] Starting AuthService tests...");
    
    // Test register users
    console.log("\n\n[authTest.ts] Registering Users...");
    const registerResult = await AuthService.register("maci", "maci@test.com", "test1234");
    console.log("[authTest.ts] Register Result:", registerResult);
    
    // Test duplicate registration (username)
    console.log("\n\n[authTest.ts] Registering User with duplicate username...");
    const duplicateUsername = await AuthService.register("maci", "newemail@test.com", "test1234");
    console.log("[authTest.ts] Duplicate Username:", duplicateUsername);
    
    // Test duplicate registration (email)
    console.log("\n\n[authTest.ts] Registering User with duplicate email...");
    const duplicateEmail = await AuthService.register("newuser", "maci@test.com", "test1234");
    console.log("[authTest.ts] Duplicate Email:", duplicateEmail);
    
    // Test login with correct credentials
    console.log("\n\n[authTest.ts] Logging in with correct credentials...");
    const validLogin = await AuthService.login("maci", "test1234");
    console.log("[authTest.ts] Valid Login:", validLogin);
    
    // Test login with incorrect password
    console.log("\n\n[authTest.ts] Logging in with incorrect password...");
    const invalidLogin = await AuthService.login("maci", "wrongpassword");
    console.log("[authTest.ts] Invalid Login:", invalidLogin);
    
    // Test login with non-existent user
    console.log("\n\n[authTest.ts] Logging in with non-existent user...");
    const nonExistentLogin = await AuthService.login("ghost", "test1234");
    console.log("[authTest.ts] Non-Existent Login:", nonExistentLogin);
    
    // Test password recovery by username
    console.log("\n\n[authTest.ts] Recovering password by username...");
    const recoverByUsername = await AuthService.recover(EUserFind.USERNAME, "maci");
    console.log("[authTest.ts] Recover By Username:", recoverByUsername);
    
    // Test password recovery by email
    console.log("\n\n[authTest.ts] Recovering password by email...");
    const recoverByEmail = await AuthService.recover(EUserFind.EMAIL, "maci@test.com");
    console.log("[authTest.ts] Recover By Email:", recoverByEmail);
    
    // Test password recovery for non-existent user
    console.log("\n\n[authTest.ts] Recovering password for non-existent user...");
    const recoverNonExistent = await AuthService.recover(EUserFind.USERNAME, "ghost");
    console.log("[authTest.ts] Recover Non-Existent User:", recoverNonExistent);
    
    console.log("\n\n[authTest.ts] AuthService tests finished.");
};

export default authTest;