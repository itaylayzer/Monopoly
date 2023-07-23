import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Player } from "./player";
//#region Setup
const app = express();
const port = 5175;
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
};

//#endregion
//#region Game Logic
io.on("connection", (socket: Socket) => {
    const connectable = !gameStarted;
    socket.emit("state", connectable);
    if (connectable) {
        // Handle name event
        socket.on("name", (name: string) => {
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
            console.log(`current id ${currentId}`);
            Clients.set(socket.id, {
                player: player,
                socket: socket,
                ready: false,
            });
            const other_players = [];
            for (const x of Clients.values()) {
                other_players.push(x.player.to_json());
            }
            socket.emit("initials", { turn_id: currentId, other_players });
            EmitExcepts(socket.id, "new-player", player.to_json());

            // handle all events from here on!
            // game sockets

            socket.on("roll_dice", () => {
                const first = Math.floor(Math.random() * 6) + 1;
                const second = Math.floor(Math.random() * 6) + 1;
                const sum = first + second;
                player.position = (player.position + sum) % 40;
                // Clients.get(currentId).player = player;
                console.log(Clients.get(currentId).player == player);
                EmitAll("dice_roll_result", {
                    listOfNums: [first, second, player.position],
                    turnId: currentId,
                });
            });
            socket.on("finish-turn", (playerInfo: PlayerJSON) => {
                player.from_json(playerInfo);

                if (currentId != socket.id) return;

                const arr = Array.from(Clients.keys());
                var i = arr.indexOf(socket.id);
                i = (i + 1) % arr.length;
                currentId = arr[i];
                console.log(
                    `turn-finished ${JSON.stringify(player.to_json())}`
                );
                EmitAll("turn-finished", {
                    from: socket.id,
                    turnId: currentId,
                    pJson: player.to_json(),
                });
            });

            socket.on("message", (message: string) => {
                EmitAll("message", { from: player.username, message: message });
            });

            socket.on("pay",(args:{balance:number, from:string, to:string})=>{
                const p = Clients.get(args.to).player;
                p.balance += args.balance;
                EmitAll("member_updating",{
                    playerId:args.to,
                    animation:"recieveMoney",
                    additional_props:[args.from],
                    pJson: p.to_json()
                });
            })
        });
        socket.on("ready", (args: boolean) => {
            const client = Clients.get(socket.id);
            client.ready = args;
            Clients.set(socket.id, client);

            // Check if everyone Ready!

            const readys = Array.from(Clients.values()).map((v) => v.ready);
            // console.log(JSON.stringify(readys));

            if (!readys.includes(false)) {
                console.log("starting game");
                gameStarted = true;
                EmitAll("start-game", {});
            }
        });
    } else {
        socket.disconnect();
    }

    // Handle disconnect event
    socket.on("disconnect", () => {
        Clients.delete(socket.id);
        EmitAll("disconnected-player", socket.id);

        if (Array.from(Clients.keys()).length === 0) {
            gameStarted = false;
            messages = [];
            console.log("ending game. open to new players");
        }
    });
});

//#endregion

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
