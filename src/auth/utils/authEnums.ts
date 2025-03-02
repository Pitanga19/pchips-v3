// pchips-v3/src/auth/utils/authEnums.ts

export enum EUserFindType {
    USERNAME = 'username',
    EMAIL = 'email',
    NULL = 'null',
};

export enum EAuthProcess {
    REGISTER = 'register',
    LOGIN = 'login',
    UPDATE = 'update',
    RECOVER_PASSWORD = 'recover-password',
    DELETE_ACCOUNT = 'delete-account',
};

export enum ESafeword {
    DELETE_ACCOUNT = 'DELETE ACCOUNT',
};