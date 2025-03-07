// pchips-v3/db/utils/interfaces.ts

import { EFriendStatus, EBlindIncreaseType, ERebuyAddon, EStartingChipsType, EBlindLevel, EActionType, ETableSize, EPlayerStatus } from "../dbIndex";

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
    gameId: number,
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
    gameId: number,
    dealerSeat: number,
    smallBlindSeat: number,
    bigBlindSeat: number,
    actionSeat: number,
};

export interface IPlayer {
    id: number,
    userId: number,
    roomId: number,
    gameId: number,
    seatNumber: number,
    status: EPlayerStatus,
    chips: number,
    bettingChips: number,
};

export interface IPot {
    id: number,
    gameId: number,
    handId: number,
    roundId: number,
    potNumber: number,
    chips: number,
};

export interface IGame {
    id: number,
    roomId: number,
    tableNumber: number,
    isPaused: boolean,
};

export interface IHand {
    id: number,
    gameId: number,
    handCount: number,
};

export interface IRound {
    id: number,
    gameId: number,
    handId: number,
    roundCount: number,
};

export interface IAction {
    id: number,
    gameId: number,
    handId: number,
    roundId: number,
    playerId: number,
    actionCount: number,
    type: EActionType,
    amount: number,
};