// pchips-v3/src/utils/enums/errorEnums.ts

export enum EErrorField {
    ID = 'id',
    USERNAME = 'username',
    EMAIL = 'email',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'repeat-password',
    FINDED_TYPE = 'finded-type',
    FINDED_VALUE = 'finded-value',
    UPDATES = 'updates',
    FRIENDSHIP = 'friendship',
};

export enum EErrorMessage {
    DATA_IS_MISSING = 'data-is-missing',                // 400 Bad Request
    CHAR_EXCESS = 'char-excess',                        // 400 Bad Request
    NOT_ENOUGH_CHARS = 'not-enough-chars',              // 400 Bad Request
    NOT_ALPHANUMERIC = 'not-alphanumeric',              // 400 Bad Request
    NOT_EMAIL_FORMAT = 'not-email-format',              // 400 Bad Request
    INVALID_DATA = 'invalid-data',                      // 400 Bad Request
    NOT_SAME_PASSWORD = 'not-same-password',            // 400 Bad Request
    WRONG_PASSWORD = 'wrong-password',                  // 401 Unauthorized
    USER_NOT_FOUND = 'user-not-found',                  // 404 Not Found
    EXISTING_USERNAME = 'existing-username',            // 409 Conflict
    EXISTING_EMAIL = 'existing-email',                  // 409 Conflict
    EXISTING_FRIENDSHIP = 'existing-friendship',        // 409 Conflict
    INTERNAL_SERVER_ERROR = 'internal-server-error',    // 500 Internal Server Error
};