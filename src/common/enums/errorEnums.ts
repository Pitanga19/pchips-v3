// pchips-v3/src/common/enums/errorEnums.ts

export enum EErrorField {
    ID = 'id',
    UPDATES = 'updates',
    USER = 'user',
    USERNAME = 'username',
    EMAIL = 'email',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'repeat-password',
    SAFEWORD = 'safeword',
    FINDED_TYPE = 'finded-type',
    FINDED_VALUE = 'finded-value',
    FRIEND = 'friend',
    BLOCK = 'block',
    RELATION = 'relation',
    PARTY = 'party',
    PARTY_NAME = 'party-name',
    PARTY_USER = 'party-user',
    PARTY_ACTOR = 'party-actor',
    PARTY_TARGET = 'party-target',
    SETTING = 'setting',
};

export enum EErrorMessage {
    DATA_IS_MISSING = 'data-is-missing',                    // 400 Bad Request
    CHAR_EXCESS = 'char-excess',                            // 400 Bad Request
    NOT_ENOUGH_CHARS = 'not-enough-chars',                  // 400 Bad Request
    NOT_ALPHANUMERIC = 'not-alphanumeric',                  // 400 Bad Request
    NOT_EMAIL_FORMAT = 'not-email-format',                  // 400 Bad Request
    INVALID_DATA = 'invalid-data',                          // 400 Bad Request
    NOT_SAME_PASSWORD = 'not-same-password',                // 400 Bad Request
    RELATION_ACCEPTED = 'relation-accepted',                // 400 Bad Request
    RELATION_PENDING = 'relation-pending',                  // 400 Bad Request
    WRONG_SENDER = 'wrong-sender',                          // 400 Bad Request
    WRONG_PASSWORD = 'wrong-password',                      // 401 Unauthorized
    WRONG_SAFEWORD = 'wrong-safeword',                      // 401 Unauthorized
    INSUFFICIENT_PERMISSIONS = 'insufficient-permissions',  // 401 Unauthorized
    NOT_FOUND = 'not-found',                                // 404 Not Found
    ALREADY_EXIST = 'already-exists',                      // 409 Conflict
    SAME_USER = 'same-user',                                // 409 Conflict
    IS_OWNER = 'is-owner',                                  // 409 Conflict
    INTERNAL_SERVER_ERROR = 'internal-server-error',        // 500 Internal Server Error
};