export type EngineSettings = "2d" | "3d";
export type MonopolySettings = {
    gameEngine: EngineSettings;
    accessibility: [number, number, boolean, boolean, boolean];
    audio: [number, number, number];
    notifications: boolean;
};
export type MonopolyCookie = {
    login: {
        name: string;
        host: string;
        rememberHost: boolean;
        rememberName: boolean;
    };
    settings?: MonopolySettings;
};
