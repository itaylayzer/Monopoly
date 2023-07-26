export class Player {
    public id: string;
    public username: string;
    public icon: number;

    public position: number;
    public balance: number;
    public properties: Array<{
        posistion: number;
        count: 0 | 1 | 2 | 3 | 4 | "h";
        group: string;
    }>;
    public isInJail: boolean;
    public jailTurnsRemaining: number;
    public getoutCards: number;
    public ready: boolean;
    constructor(_id: string, _name: string) {
        this.id = _id;
        this.username = _name;
        this.icon = -1;
        this.position = 0;
        this.balance = 1500;
        this.properties = [];
        this.isInJail = false;
        this.jailTurnsRemaining = 0;
        this.getoutCards = 0;
        this.ready = false;
    }
    recieveJson(json: PlayerJSON) {
        this.username = json.username;
        this.position = json.position;
        this.icon = json.icon;
        this.balance = json.balance;
        this.properties = json.properties;
        this.isInJail = json.isInJail;
        this.jailTurnsRemaining = json.jailTurnsRemaining;
        this.getoutCards = json.getoutCards;
        return this;
    }

    public toJson() {
        return {
            balance: this.balance,
            icon: this.icon,
            id: this.id,
            isInJail: this.isInJail,
            jailTurnsRemaining: this.jailTurnsRemaining,
            position: this.position,
            properties: this.properties,
            username: this.username,
            getoutCards: this.getoutCards,
        } as PlayerJSON;
    }
}
export type PlayerJSON = {
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