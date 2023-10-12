import { Socket, Server } from "./sockets";
import monopolyJSON from "./monopoly.json";
import { GameTrading, MonopolyMode, MonopolyModes, historyAction } from "./types";
class Player {
    public id: string;
    public username: string;
    public icon: number;
    public position: number;
    public balance: number;
    public properties: Array<any>;
    public isInJail: boolean;
    public jailTurnsRemaining: number;
    public getoutCards: number;
    constructor(_id: string, _name: string, _icon: number, cash?: number) {
        this.id = _id;
        this.username = _name;
        this.icon = _icon;
        this.position = 0;
        this.balance = cash ?? 1500;
        this.properties = [];
        this.isInJail = false;
        this.jailTurnsRemaining = 0;
        this.getoutCards = 0;
    }

    to_json(): PlayerJSON {
        return {
            id: this.id,
            username: this.username,
            icon: this.icon,
            position: this.position,
            balance: this.balance,
            properties: this.properties,
            isInJail: this.isInJail,
            jailTurnsRemaining: this.jailTurnsRemaining,
            getoutCards: this.getoutCards,
        };
    }

    from_json(json: PlayerJSON) {
        if (this.id == json.id) {
            this.position = json.position;
            this.balance = json.balance;
            this.properties = json.properties;
            this.isInJail = json.isInJail;
            this.jailTurnsRemaining = json.jailTurnsRemaining;
            this.getoutCards = json.getoutCards;
        }
    }
}

type PlayerJSON = {
    id: string;
    username: string;
    icon: number;
    position: number;
    balance: number;
    properties: Array<any>;
    isInJail: boolean;
    jailTurnsRemaining: number;
    getoutCards: number;
};

export async function main(playersCount: number, f?: (host: string, Server: Server) => void) {

    const maxPlayers = playersCount > 0 ? Math.min(playersCount, 6) : 6;

    interface Client {
        player: Player;
        socket: Socket;
        ready: boolean;
        positions: { x: number; y: number };
    }

    const Clients = new Map<string, Client>();
    const logs_strings: Array<string> = [];

    //#region Game Variables!
    let currentId: string = "";
    let gameStarted: boolean = false;
    let selectedMode: MonopolyMode = MonopolyModes[0];

    //#endregion
    // Io

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const currentTime = `${hours}:${minutes}`;

        return currentTime;
    }

    //#region emits functions
    function EmitAll(event: string, args: any) {
        for (const x of Array.from(Clients.values())) {
            x.socket.emit(event, args);
        }
    }

    function EmitExcepts(id: string, event: string, args: any) {
        for (const x of Array.from(Clients.entries())) {
            if (x[0] != id) {
                x[1].socket.emit(event, args);
            }
        }
    }
    //#endregion

    //#endregion
    //#region Game Logic
    new Server(
        (server) => {
            f?.(server.code, server);
        },
        (socket: Socket, server: Server) => {
            // Handle name event
            console.log("state",Clients.size < maxPlayers && !gameStarted ?  0 : gameStarted ? 1 : 2)
            socket.emit("state", Clients.size < maxPlayers && !gameStarted ?  0 : gameStarted ? 1 : 2)
            socket.on("name", (name: string) => {
                try {
                    const player = new Player(socket.id, name, Array.from(Clients.keys()).length, selectedMode.startingCash);

                    // handle current id =>
                    if (currentId === "" || !Array.from(Clients.keys()).includes(currentId)) {
                        currentId = socket.id;
                    }
                    Clients.set(socket.id, {
                        player: player,
                        socket: socket,
                        ready: false,
                        positions: { x: 0, y: 0 },
                    });
                    server.logFunction(`{${getCurrentTime()}} [${socket.id}] Player "${player.username}" has connected.`);
                    logs_strings.push(`{${getCurrentTime()}} [${socket.id}] Player "${player.username}" has connected.`);
                    const other_players = [];
                    for (const x of Array.from(Clients.values())) {
                        other_players.push(x.player.to_json());
                    }
                    socket.emit("initials", {
                        turn_id: currentId,
                        other_players,
                        selectedMode,
                    });
                    EmitExcepts(socket.id, "new-player", player.to_json());

                    // handle all events from here on!
                    // game sockets
                    socket.on("unjail", (option: "card" | "pay") => {
                        try {
                            EmitAll("unjail", {
                                to: player.id,
                                option,
                            });
                        } catch (e) {
                            server.logFunction(e);
                        }
                    });
                    socket.on("roll_dice", () => {
                        try {
                            const first = Math.floor(Math.random() * 6) + 1;
                            const second = Math.floor(Math.random() * 6) + 1;
                            const x = `{${getCurrentTime()}} [${socket.id}] Player "${player.username}" rolled a [${first},${second}].`;
                            logs_strings.push(x);
                            server.logFunction(x);
                            const sum = first + second;
                            var pos = (player.position + sum) % 40;
                            EmitAll("dice_roll_result", {
                                listOfNums: [first, second, pos],
                                turnId: currentId,
                            });
                        } catch (e) {
                            server.logFunction(e);
                        }
                    });
                    // chest or chance
                    socket.on("chorch_roll", (args: { is_chance: boolean; rolls: number }) => {
                        try {
                            const arr = args.is_chance ? monopolyJSON.chance : monopolyJSON.communitychest;
                            const randomElement = arr[Math.floor(Math.random() * arr.length)];
                            EmitAll("chorch_result", {
                                element: randomElement,
                                is_chance: args.is_chance,
                                rolls: args.rolls,
                                turnId: currentId,
                            });
                        } catch (e) {
                            server.logFunction(e);
                        }
                    });
                    socket.on("player_update", (args: { playerId: string; pJson: PlayerJSON }) => {
                        const xplayer = Clients.get(args.playerId);
                        if (xplayer === undefined) return;

                        xplayer.player.from_json(args.pJson);
                        EmitExcepts(args.playerId, "player_update", args);
                    });
                    socket.on("finish-turn", (playerInfo: PlayerJSON) => {
                        try {
                            player.from_json(playerInfo);
                            if (currentId != socket.id) return;
                            const arr = Array.from(Clients.values())
                                .filter((v) => v.player.balance > 0)
                                .map((v) => v.player.id);
                            var i = arr.indexOf(socket.id);
                            i = (i + 1) % arr.length;
                            currentId = arr[i];

                            EmitAll("turn-finished", {
                                from: socket.id,
                                turnId: currentId,
                                pJson: player.to_json(),
                                WinningMode: selectedMode.WinningMode,
                            });
                        } catch (e) {
                            server.logFunction(e);
                        }
                    });

                    socket.on("message", (message: string) => {
                        try {
                            server.logFunction(
                                `{${getCurrentTime()}} [${socket.id}] Player "${Clients.get(socket.id)?.player.username}" has messaged "${message}".`
                            );
                            EmitAll("message", {
                                from: player.username,
                                message: message,
                            });
                        } catch (e) {
                            server.logFunction(e);
                        }
                    });

                    socket.on("pay", (args: { balance: number; from: string; to: string }) => {
                        try {
                            const top = Clients.get(args.to)?.player;
                            const fromp = Clients.get(args.from)?.player;
                            if (top === undefined) return;
                            top.balance += args.balance;
                            if (fromp === undefined) return;
                            fromp.balance -= args.balance;
                            EmitAll("member_updating", {
                                playerId: args.to,
                                animation: "recieveMoney",
                                additional_props: [args.from],
                                pJson: [top.to_json(), fromp.to_json()],
                            });
                        } catch (e) {
                            server.logFunction(e);
                        }
                    });

                    socket.on("mouse", (args: { x: number; y: number }) => {
                        const client = Clients.get(socket.id);
                        if (client === undefined) return;
                        client.positions = args;
                        Clients.set(socket.id, client);

                        EmitExcepts(socket.id, "mouse", {
                            id: socket.id,
                            x: args.x,
                            y: args.y,
                        });
                    });
                    socket.on("history", (args: historyAction) => {
                        EmitAll("history", args);
                    });

                    socket.on("trade", () => {
                        if (!selectedMode.AllowDeals) return;
                        EmitAll("trade", {});
                    });
                    socket.on("cancel-trade", () => {
                        if (!selectedMode.AllowDeals) return;
                        EmitAll("cancel-trade", {});
                    });
                    socket.on("submit-trade", (x: GameTrading) => {
                        if (!selectedMode.AllowDeals) return;
                        const turnPlayer = Clients.get(x.turnPlayer.id);
                        const againstPlayer = Clients.get(x.againstPlayer.id);
                        if (turnPlayer === undefined || againstPlayer === undefined) return;

                        // Exclude against
                        const turnGets = againstPlayer.player.properties.filter((v1) =>
                            x.againstPlayer.prop.map((v2) => JSON.stringify(v2)).includes(JSON.stringify(v1))
                        );
                        againstPlayer.player.properties = againstPlayer.player.properties.filter(
                            (v1) => !x.againstPlayer.prop.map((v2) => JSON.stringify(v2)).includes(JSON.stringify(v1))
                        );

                        // Exclude turn
                        const againsGets = againstPlayer.player.properties.filter((v1) =>
                            x.turnPlayer.prop.map((v2) => JSON.stringify(v2)).includes(JSON.stringify(v1))
                        );
                        turnPlayer.player.properties = againstPlayer.player.properties.filter(
                            (v1) => !x.turnPlayer.prop.map((v2) => JSON.stringify(v2)).includes(JSON.stringify(v1))
                        );

                        // Now Balance
                        againstPlayer.player.balance -= x.againstPlayer.balance;
                        turnPlayer.player.balance -= x.turnPlayer.balance;

                        turnPlayer.player.balance += x.againstPlayer.balance;
                        againstPlayer.player.balance += x.turnPlayer.balance;

                        // Exclude switch
                        turnPlayer.player.properties.push(...turnGets);
                        againstPlayer.player.properties.push(...againsGets);

                        EmitAll(
                            "submit-trade",

                            {
                                pJsons: [turnPlayer.player.to_json(), againstPlayer.player.to_json()],
                                action: `
                            ${turnPlayer.player.username} done a trade with ${againstPlayer.player.username}
                            `,
                            }
                        );
                    });
                    socket.on("trade-update", (x: GameTrading) => {
                        if (!selectedMode.AllowDeals) return;
                        EmitAll("trade-update", x);
                    });
                } catch (e) {
                    server.logFunction(e);
                }
            });
            socket.on("ready", (args: { ready?: boolean; mode?: MonopolyMode }) => {
                try {
                    const client = Clients.get(socket.id);
                    if (client === undefined) return;
                    if (args.ready !== undefined) {
                        client.ready = args.ready;
                    }
                    if (args.mode !== undefined) {
                        selectedMode = args.mode;
                    }
                    Clients.set(socket.id, client);

                    // Check if everyone Ready!

                    const readys = Array.from(Clients.values()).map((v) => v.ready);
                    EmitAll("ready", {
                        id: socket.id,
                        state: client.ready,
                        selectedMode,
                    });
                    if (!readys.includes(false)) {
                        server.logFunction(`Game has Started, No more Players can join the Server`);
                        gameStarted = true;
                        EmitAll("start-game", {});
                    }
                } catch (e) {
                    server.logFunction(e);
                }
            });

            // Handle disconnect event
            socket.on("disconnect", () => {
                try {
                    if (Clients.has(socket.id)) {
                        server.logFunction(
                            `{${getCurrentTime()}} [${socket.id}] Player "${Clients.get(socket.id)?.player.username}" has disconnected.`
                        );
                        logs_strings.push(
                            `{${getCurrentTime()}} [${socket.id}] Player "${Clients.get(socket.id)?.player.username}" has disconnected.`
                        );
                    }
                    Clients.delete(socket.id);
                    if (currentId === socket.id) {
                        const arr = Array.from(Clients.values())
                            .filter((v) => v.player.balance > 0)
                            .map((v) => v.player.id);
                        var i = arr.indexOf(socket.id);
                        i = (i + 1) % arr.length;
                        currentId = arr[i];
                    }
                    EmitAll("disconnected-player", {
                        id: socket.id,
                        turn: currentId,
                    });

                    if (Array.from(Clients.keys()).length === 0) {
                        if (gameStarted) server.logFunction("Game has Ended. Server is currently Open to new Players");
                        gameStarted = false;
                    }
                } catch (e) {
                    server.logFunction(e);
                }
            });
        }
    );
}
