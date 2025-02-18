// pchips-v3/db/models/utils/interfaces.ts

import { EFriendStatus } from "./enums";

export interface IUser {
    id: number,
    username: string,
    email: string,
};

export interface IFriend {
    id: number,
    firstUserId: number,
    secondUserId: number,
    senderId: number,
    status: EFriendStatus,
};

