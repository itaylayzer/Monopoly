import Peer, { DataConnection, PeerOptions } from "peerjs";
import { TranslateCode, code } from "./code";
import Config from "../config";

const peerOptions: PeerOptions = {
	// @ts-ignore
	debug: Config.PEER_DEBUG_LEVEL ?? 0,
	// @ts-ignore
	secure: Config.PEER_SECURE ?? false,
	// @ts-ignore
	port: Config.PEER_SERVER_PORT ?? 443,
	// @ts-ignore
	host: Config.PEER_SERVER_HOST ?? undefined,
};

export function io(uri: string): Promise<Socket> {
	return new Promise((resolve, reject) => {
		const peer = new Peer(peerOptions);

		// Listen for the 'open' event, which indicates that the Peer connection is open.
		peer.on("open", (id) => {
			// Once the Peer connection is open, create a data connection.
			const dataConnection = peer.connect(uri, { reliable: true });

			setTimeout(() => {
				reject("the server took too long to respond");
			}, 5000);
			dataConnection.on("open", () => {
				// Create a new Socket instance with the data connection.
				const sock = new Socket(dataConnection);
				sock.id = id;
				// Resolve the Promise with the Socket object.
				resolve(sock);
			});
			dataConnection.on("error", (r) => {
				reject(r.message);
			});
		});

		peer.on("error", (error) => {
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
		this.client.on("close", () => {
			try {
				const xhandler = this.events.get("disconnect");
				if (xhandler !== undefined) {
					xhandler("");
				}
			} catch {}
		});
	}
	public on(event_name: string | "disconnect", handler: (args: any) => void) {
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
	public code: string;
	constructor(
		idf?: (thisobj: Server) => void,
		onf?: (s: Socket, server: Server) => void
	) {
		var error = true;

		var _code: string = "";
		var _socket: Peer;

		while (error) {
			try {
				_code = code();
				_socket = new Peer(TranslateCode(_code), peerOptions);
				error = false;
			} catch {
				error = true;
			}
		}
		this.code = _code;
		// @ts-ignore
		this.socket = _socket;
		this.logFunction = (...data) => {
			this.logs.push(data);
			this.renderFunction(this.logs);
		};
		this.renderFunction = () => {};
		this.socket.on("open", async () => {
			idf?.(this);
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
	public stop() {
		this.socket.destroy();
	}
}
