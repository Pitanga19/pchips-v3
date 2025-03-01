// pchips-v3/src/common/enums/errorEnums.ts

export enum EErrorField {
    ID = 'id',
    USERNAME = 'username',
    EMAIL = 'email',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'repeat-password',
    FINDED_TYPE = 'finded-type',
    FINDED_VALUE = 'finded-value',
    UPDATES = 'updates',
    RELATION = 'relation',
    PARTY = 'party',
    PARTY_NAME = 'party-name',
    PARTY_USER = 'party-user',
    PARTY_ACTOR = 'party-actor',
    PARTY_TARGET = 'party-target',
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
    INSUFFICIENT_PERMISSIONS = 'insufficient-permissions',  // 401 Unauthorized
    USER_NOT_FOUND = 'user-not-found',                      // 404 Not Found
    RELATION_NOT_FOUND = 'relation-not-found',              // 404 Not Found
    FRIENDLIST_NOT_FOUND = 'friendlist-not-found',          // 404 Not Found
    BLOCK_NOT_FOUND = 'block-not-found',                    // 404 Not Found
    PARTY_NOT_FOUND = 'party-not-found',                    // 404 Not Found
    EXISTING_USERNAME = 'existing-username',                // 409 Conflict
    EXISTING_EMAIL = 'existing-email',                      // 409 Conflict
    EXISTING_RELATION = 'existing-relation',                // 409 Conflict
    EXISTING_BLOCK = 'existing-block',                      // 409 Conflict
    EXISTING_PARTY_USER = 'existing-party-user',            // 409 Conflict
    SAME_USER = 'same-user',                                // 409 Conflict
    IS_OWNER = 'is-owner',                                  // 409 Conflict
    INTERNAL_SERVER_ERROR = 'internal-server-error',        // 500 Internal Server Error
};