// pchips-v3/src/common/enums/statusEnums.ts

export enum EResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
};

export enum EResponseMessage {
    SUCCESS = 'success',                                // 200 OK
    CREATED = 'created',                                // 201 Created
    NO_CONTENT = 'no-content',                          // 204 No Content
    BAD_REQUEST = 'bad-request',                        // 400 Bad Request
    INVALID_DATA = 'invalid-data',                      // 400 Bad Request
    UNAUTHORIZED = 'unauthorized',                      // 401 Unauthorized
    FORBIDDEN = 'forbidden',                            // 403 Forbidden
    NOT_FOUND = 'not-found',                            // 404 Not Found
    CONFLICT = 'conflict',                              // 409 Conflict
    INTERNAL_SERVER_ERROR = 'internal-server-error',    // 500 Internal Server Error
};

