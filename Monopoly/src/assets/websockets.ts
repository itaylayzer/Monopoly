import Peer, { DataConnection } from "peerjs";

export function io(uri: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
        const peer = new Peer({
            debug: 0,
            logFunction: (...data: any[]) => {
                console.log("client: ", ...data);
            },
            secure: false,
        });

        // Listen for the 'open' event, which indicates that the Peer connection is open.
        peer.on("open", (id) => {
            // Once the Peer connection is open, create a data connection.
            const dataConnection = peer.connect(uri, { reliable: true });

            // Create a new Socket instance with the data connection.
            const sock = new Socket(dataConnection, "client-side");
            sock.id = id;
            // Resolve the Promise with the Socket object.
            resolve(sock);
        });

        peer.on("error", (error) => {
            console.error("PeerJS error:", error);
            // Reject the Promise if there's an error.
            reject(error);
        });
    });
}

// class For Server
export class Socket {
    private client: DataConnection;
    public events: Map<string, (args: any) => void>;
    public id: string;
    private debugName: string;
    private log(...data: any[]) {
        console.log(this.debugName + ": ", ...data);
    }
    constructor(_socket: DataConnection, debugName?: string) {
        this.debugName = debugName ?? "socket";
        this.id = "";
        this.client = _socket;
        this.events = new Map();

        this.client.on("data", (data) => {
            try {
                const d = JSON.parse(data as string) as {
                    event: string;
                    args: any;
                };
                const xhandler = this.events.get(d.event);
                if (xhandler !== undefined) {
                    xhandler(d.args);
                }
            } catch {}
        });

        this.client.on("error", (error) => {
            console.error("Data connection error:", error);
            this.log(Array.from(this.events.keys()));
        });
    }
    public on(event_name: string, handler: (args: any) => void) {
        this.events.set(event_name, handler);
        this.client.on("data", () => {});
    }
    public emit(event_name: string, args?: any) {
        if (event_name !== "mouse")
            this.log(
                `${JSON.stringify({
                    event: event_name,
                    args: args ?? undefined,
                })}`
            );
        this.client.send(
            JSON.stringify({ event: event_name, args: args ?? undefined })
        );
    }
    public disconnect() {
        this.emit("disconnect");
        this.client.close();
    }
}

export class Server {
    private socket: Peer;
    constructor(idf?: (id: string) => void, onf?: (s: Socket) => void) {
        this.socket = new Peer({
            debug: 0,
            logFunction: (...data: any[]) => {
                console.log("server: ", ...data);
            },
        });
        this.socket.on("open", (id) => {
            idf?.(id);
        });
        this.socket.on("connection", (dataConnection) => {
            dataConnection.on("open", () => {
                const socket = new Socket(dataConnection, "server-side");
                socket.id = dataConnection.peer;
                onf?.(socket);
            });
        });
    }
}
