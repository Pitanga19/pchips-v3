// pchips-v3/src/tests/test.ts

import UserService from "../services/UserService";

export const test = async () => {
    await UserService.create('maci', 'maci@test.com', 'test1234');
    await UserService.create('luchi', 'luchi@test.com', 'test1234');
    await UserService.create('tito', 'tito@test.com', 'test1234');
    await UserService.create('hugo', 'hugo@test.com', 'test1234');
    await UserService.create('ana', 'ana@test.com', 'test1234');
};

export default test;