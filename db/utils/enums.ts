// pchips-v3/db/utils/enums.ts

export enum EFriendStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
};

export enum ETableSize {
    TWO_MAX = 2,
    FOUR_MAX = 4,
    SIX_MAX = 6,
    TEN_MAX = 10,
};

export enum EBlindLevel {
    NL2 = 2,
    NL5 = 5,
    NL10 = 10,
    NL25 = 25,
    NL50 = 50,
    NL100 = 100,
    NL200 = 200,
    NL500 = 500,
    NL1000 = 1000,
    NL2000 = 2000,
    NL5000 = 5000,
    NL10000 = 10000,
};

export enum ERebuyAddon {
    NONE = 'none',
    REBUY = 'rebuy',
    ADDON = 'addon',
    REBUY_ADDON = 'rebuy_addon',
};

export enum EBlindIncreaseType {
    NONE = 'none',
    TIME = 'time',
    HANDS = 'hands',
    ELIMINATIONS = 'eliminations',
};

export enum EStartingChipsType {
    EQUAL = 'equal',
    CUSTOM = 'custom',
};

export enum EActionType {
    FOLD = 'fold',
    CHECK = 'check',
    CALL = 'call',
    BET = 'bet',
    RAISE = 'raise',
    ALLIN = 'allin',
};

export enum EPlayerStatus {
    PLAYING = 'playing',
    ALLIN = 'allin',
    WAITING_NEXT_HAND = 'waiting-next-hand',
    WAITING_BB = 'waiting-bb',
    AFK = 'afk',
};

export enum ETableStatus {
    STARTING = 'starting',
    RUNNING = 'running',
    PAUSED = 'paused',
    FINISHED = 'finished',
};