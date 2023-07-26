import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Player } from "./player";
import monopolyJSON from "../../MonopolyClient/src/assets/monopoly.json";
// console.log(`Reading files...`);
console.log(`Starting the Server...`);
import {
    bgWhite,
    greenBright,
    redBright,
    black,
    bgBlue,
    bgRed,
} from "colorette";

//#region Setup
const app = express();
const port = 5176;
const httpServer = createServer(app);

interface Client {
    player: Player;
    socket: Socket;
    ready: boolean;
}

const Clients = new Map<string, Client>();

//#region Game Variables!
let currentId: string = "";
let gameStarted: boolean = false;
let messages: Array<{ from: string; message: string }> = [];
//#endregion
// Io
const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173", methods: ["POST", "GET"] },
});

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

//#endregion
//#region Game Logic
io.on("connection", (socket: Socket) => {
    const connectable = !gameStarted;
    socket.emit("state", connectable);
    if (connectable) {
        // Handle name event
        socket.on("name", (name: string) => {
            try {
                const player = new Player(
                    socket.id,
                    name,
                    Array.from(Clients.keys()).length
                );

                // handle current id =>
                if (
                    currentId === "" ||
                    !Array.from(Clients.keys()).includes(currentId)
                ) {
                    currentId = socket.id;
                }
                Clients.set(socket.id, {
                    player: player,
                    socket: socket,
                    ready: false,
                });
                console.log(
                    greenBright(
                        `[${socket.id}] Player "${player.username}" has connected.`
                    )
                );
                const other_players = [];
                for (const x of Clients.values()) {
                    other_players.push(x.player.to_json());
                }
                socket.emit("initials", { turn_id: currentId, other_players });
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
                        console.log(bgRed(black(e)));
                    }
                });
                socket.on("roll_dice", () => {
                    try {
                        const first = Math.floor(Math.random() * 6) + 1;
                        const second = Math.floor(Math.random() * 6) + 1;
                        console.log(
                            `[${socket.id}] Player "${player.username}" rolled a [${first},${second}].`
                        );
                        const sum = first + second;
                        const pos = (player.position + sum) % 40;
                        EmitAll("dice_roll_result", {
                            listOfNums: [first, second, pos],
                            turnId: currentId,
                        });
                    } catch (e) {
                        console.log(bgRed(black(e)));
                    }
                });
                // chest or chance
                socket.on("chorch_roll", (is_chance) => {
                    try {
                        const arr = is_chance
                            ? monopolyJSON.chance
                            : monopolyJSON.communitychest;
                        const randomElement =
                            arr[Math.floor(Math.random() * arr.length)];

                        EmitAll("chorch_result", {
                            element: randomElement,
                            is_chance,
                            turnId: currentId,
                        });
                    } catch (e) {
                        console.log(bgRed(black(e)));
                    }
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
                        });
                    } catch (e) {
                        console.log(bgRed(black(e)));
                    }
                });

                socket.on("message", (message: string) => {
                    try {
                        EmitAll("message", {
                            from: player.username,
                            message: message,
                        });
                    } catch (e) {
                        console.log(bgRed(black(e)));
                    }
                });

                socket.on(
                    "pay",
                    (args: { balance: number; from: string; to: string }) => {
                        try {
                            const p = Clients.get(args.to).player;
                            p.balance += args.balance;
                            EmitAll("member_updating", {
                                playerId: args.to,
                                animation: "recieveMoney",
                                additional_props: [args.from],
                                pJson: p.to_json(),
                            });
                        } catch (e) {
                            console.log(bgRed(black(e)));
                        }
                    }
                );
            } catch (e) {
                console.log(bgRed(black(e)));
            }
        });
        socket.on("ready", (args: boolean) => {
            try {
                const client = Clients.get(socket.id);
                client.ready = args;
                Clients.set(socket.id, client);

                // Check if everyone Ready!

                const readys = Array.from(Clients.values()).map((v) => v.ready);
                EmitAll("ready", { id: socket.id, state: args });
                if (!readys.includes(false)) {
                    console.log(
                        bgBlue(
                            black(
                                "Game has Started, No more Players can join the Server"
                            )
                        )
                    );
                    gameStarted = true;
                    EmitAll("start-game", {});
                }
            } catch (e) {
                console.log(bgRed(black(e)));
            }
        });
    } else {
        socket.disconnect();
    }

    // Handle disconnect event
    socket.on("disconnect", () => {
        try {
            if (Clients.has(socket.id)) {
                console.log(
                    redBright(
                        `[${socket.id}] Player "${
                            Clients.get(socket.id).player.username
                        }" has disconnected.`
                    )
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
            EmitAll("disconnected-player", { id: socket.id, turn: currentId });

            if (Array.from(Clients.keys()).length === 0) {
                messages = [];
                if (gameStarted)
                    console.log(
                        bgBlue(
                            black(
                                "Game has Ended. Server is currently Open to new Players"
                            )
                        )
                    );
                gameStarted = false;
            }
        } catch (e) {
            console.log(bgRed(black(e)));
        }
    });
});

//#endregion

httpServer.listen(port, () => {
    console.log(bgWhite(black(`Server is running on port ${port}`)));
});
