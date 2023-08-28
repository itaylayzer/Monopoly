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
        BuyingSystem: "Following Order",
        Name: "Classic",
        startingCash: 1500,
        mortageAllowed: true,
    },
    {
        AllowDeals: true,
        WinningMode: "monopols",
        BuyingSystem: "Everything",
        Name: "Monopol",
        startingCash: 1500,
        mortageAllowed: false,
    },
    {
        AllowDeals: false,
        WinningMode: "last-standing",
        BuyingSystem: "Card Firsts",
        Name: "Run-Down",
        startingCash: 1500,
        mortageAllowed: false,
        turnTimer: 30,
    },
] as MonopolyMode[];

export interface MonopolyMode {
    WinningMode: "last-standing" | "monopols" | "monopols & trains";
    BuyingSystem: "Following Order" | "Card Firsts" | "Everything";
    AllowDeals: boolean;
    Name: string;
    startingCash: number;
    mortageAllowed: boolean;
    turnTimer: undefined | number; // Time in Seconds
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
