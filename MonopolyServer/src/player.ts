export class Player {

    public id: string;
    public username: string;
    public icon: number;
    public position: number;
    public balance: number;
    public properties: Array<any>;
    public isInJail: boolean;
    public jailTurnsRemaining: number;
    public getoutCards:number;
    constructor(_id: string, _name: string, _icon: number) {
        this.id = _id; // Unique identifier for the player
        this.username = _name; // Player's username or name
        this.icon = _icon;

        this.position = 0; // Current position on the game board (index of the cell)
        this.balance = 1500; // Player's current balance or money
        this.properties = []; // Array to store the properties owned by the player
        this.isInJail = false; // Flag to indicate if the player is in jail
        this.jailTurnsRemaining = 0; // Number of turns remaining in jail (if applicable)
        this.getoutCards = 0;
    }

    to_json() {
        return {
            id: this.id,
            username: this.username,
            icon: this.icon,
            position: this.position,
            balance: this.balance,
            properties: this.properties,
            isInJail: this.isInJail,
            jailTurnsRemaining: this.jailTurnsRemaining,
            getoutCards: this.getoutCards 
        };
    }

    from_json(json: {
        id: string;
        username: string;
        icon: number;
        position: number;
        balance: number;
        properties: any[];
        isInJail: boolean;
        jailTurnsRemaining: number;
        getoutCards:number
    }) {
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
