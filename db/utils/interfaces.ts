// pchips-v3/db/utils/interfaces.ts

import { EFriendStatus, EBlindIncreaseType, ERebuyAddon, EStartingChipsType, EBlindLevel, EActionType, ETableSize, EPlayerStatus, ETableStatus } from "../dbIndex";

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

export interface IBlock {
    id: number,
    blockerId: number,
    blockedId: number,
};

export interface IRoom {
    id: number,
    name: string,
};

export interface IRoomUser {
    id: number,
    roomId: number,
    userId: number,
    isOwner: boolean,
    isAdmin: boolean,
};

export interface ISettings {
    id: number,
    tableId: number,
    tableSize: ETableSize,
    blindLevel: EBlindLevel,
    blindIncreaseType: EBlindIncreaseType,
    blindIncreaseGoal: number,
    blindIncreaseCount: number,
    startingChipsType: EStartingChipsType;
    startingChips: number,
    rebuyAddon: ERebuyAddon,
};

export interface ISeatManager {
    id: number,
    tableId: number,
    dealerSeat: number,
    smallBlindSeat: number,
    bigBlindSeat: number,
    actionSeat: number,
};

export interface IPlayer {
    id: number,
    userId: number,
    roomId: number,
    tableId: number,
    status: EPlayerStatus,
    seatNumber: number | null,
    chips: number,
    bettingChips: number,
};

export interface IPot {
    id: number,
    tableId: number,
    handId: number,
    roundId: number,
    potNumber: number,
    isActive: boolean,
    chips: number,
};

export interface IPotPlayer {
    id: number,
    potId: number,
    playerId: number,
};

export interface ITable {
    id: number,
    roomId: number,
    tableNumber: number,
    status: ETableStatus,
};

export interface IHand {
    id: number,
    tableId: number,
    handCount: number,
};

export interface IRound {
    id: number,
    tableId: number,
    handId: number,
    roundCount: number,
};

export interface IAction {
    id: number,
    tableId: number,
    handId: number,
    roundId: number,
    playerId: number,
    actionCount: number,
    type: EActionType,
    amount: number,
};