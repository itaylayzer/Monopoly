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

export type Code = {
    host: string;
    mode: "p2p" | "io";
};
