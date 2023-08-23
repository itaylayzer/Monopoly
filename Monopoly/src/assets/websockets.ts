import Peer, { DataConnection } from "peerjs";

export function io(uri: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
        const peer = new Peer({
            debug: 0,
            // logFunction: (...data: any[]) => {
            //     console.log("client: ", ...data);
            // },
            secure: false,
        });

        // Listen for the 'open' event, which indicates that the Peer connection is open.
        peer.on("open", (id) => {
            // Once the Peer connection is open, create a data connection.
            const dataConnection = peer.connect(uri, { reliable: true });

            // Create a new Socket instance with the data connection.
            const sock = new Socket(dataConnection);
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
    constructor(_socket: DataConnection) {
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
        });
    }
    public on(event_name: string, handler: (args: any) => void) {
        this.events.set(event_name, handler);
        this.client.on("data", () => {});
    }
    public emit(event_name: string, args?: any) {
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
    public logFunction: (...data: any[]) => void;
    public renderFunction: (v: Array<any[]>) => void;
    public logs: Array<any[]> = [];
    constructor(
        idf?: (id: string, thisobj: Server) => void,
        onf?: (s: Socket, server: Server) => void
    ) {
        this.socket = new Peer({
            debug: 0,
            // logFunction: (...data: any[]) => {
            //     console.log("server: ", ...data);
            // },
        });
        this.logFunction = (...data) => {
            this.logs.push(data);
            console.log(data);
            this.renderFunction(this.logs);
        };
        this.renderFunction = () => {};
        this.socket.on("open", (id) => {
            idf?.(id, this);
        });
        this.socket.on("connection", (dataConnection) => {
            dataConnection.on("open", () => {
                const socket = new Socket(dataConnection);
                socket.id = dataConnection.peer;
                onf?.(socket, this);
            });
        });
    }
    public set OnLogs(v: (...data: any[]) => void) {
        this.logFunction = v;
    }

    public RenderLogs(f: (v: Array<any[]>) => void) {
        this.renderFunction = f;
        f(this.logs);
    }
}