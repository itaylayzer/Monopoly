import nameJSON from "./names.json";
export type EngineSettings = "2d" | "3d";
export type MonopolySettings = {
    gameEngine: EngineSettings;
    accessibility: [number, number, boolean, boolean, boolean];
    audio: [number, number, number];
    notifications: boolean;
};
export type MonopolyCookie = {
    login: {
        id: string;
        remember: boolean;
    };

    settings?: MonopolySettings;
};

export interface User {
    id: string;
    email: string;
    name: string;
    score: 0;
}

export const MonopolyModes = [
    {
        AllowDeals: true,
        WinningMode: "last-standing",
        // BuyingSystem: "following-order",
        Name: "Classic",
        startingCash: 1500,
        mortageAllowed: true,
        turnTimer: undefined,
    },
    {
        AllowDeals: false,
        WinningMode: "monopols & trains",
        // BuyingSystem: "everything",
        Name: "Monopol",
        startingCash: 1500,
        mortageAllowed: false,
        turnTimer: undefined,
    },
    {
        AllowDeals: false,
        WinningMode: "last-standing",
        // BuyingSystem: "card-firsts",
        Name: "Run-Down",
        startingCash: 1500,
        mortageAllowed: false,
        turnTimer: 30,
    },
] as MonopolyMode[];

export interface MonopolyMode {
    WinningMode: "last-standing" | "monopols" | "monopols & trains";
    // BuyingSystem: "following-order" | "card-firsts" | "everything";
    AllowDeals: boolean;
    Name: string;
    startingCash: number;
    mortageAllowed: boolean;
    turnTimer: undefined | number;
}

export interface PlayerProprety {
    posistion: number;
    count: 0 | 1 | 2 | 3 | 4 | "h";
    group: string;
    rent?: number;
    morgage?: boolean;
}

export interface historyAction {
    time: string;
    action: string;
}
export function history(action: string): historyAction {
    const time = new Date().toJSON();
    return {
        action,
        time,
    } as historyAction;
}

export type GameTrading = {
    turnPlayer: {
        id: string;
        balance: number;
        prop: PlayerProprety[];
    };
    againstPlayer: {
        id: string;
        balance: number;
        prop: PlayerProprety[];
    };
};
export type botInitial = { name: string; diff: string };
export function randomName(): string {
    return nameJSON[Math.floor(Math.random()*nameJSON.length)]
}
