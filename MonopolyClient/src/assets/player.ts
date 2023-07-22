export class GlobalPlayer {
    public id: string;
    public username: string;
    public icon: number;

    public position: number;
    public balance: number;
    public properties: Array<any>;
    public isInJail: boolean;

    constructor(_id: string, _name: string) {
        this.id = _id; // Unique identifier for the player
        this.username = _name; // Player's username or name
        this.icon = -1;
        this.position = 0; // Current position on the game board (index of the cell)
        this.balance = 1500; // Player's current balance or money
        this.properties = []; // Array to store the properties owned by the player
        this.isInJail = false; // Flag to indicate if the player is in jail
    }
    recieveJson(json: PlayerJSON) {
        this.username = json.username;
        this.position = json.position;
        this.icon = json.icon;
        this.balance = json.balance;
        this.properties = json.properties;
        this.isInJail = json.isInJail;

        return this;
    }
    public get name() {
        return this.username;
    }
    public get money() {
        return this.balance;
    }
    public get propcount() {
        return this.properties.length;
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
};

export class Player extends GlobalPlayer {
    private jailTurnsRemaining: number;

    constructor(_id: string, _name: string) {
        super(_id, _name);
        this.jailTurnsRemaining = 0;
    }
    // Method to move the player on the game board based on dice roll result
    move(steps: number) {
        this.position += steps;
        // Update the player's position based on the dice roll result
        // Ensure the player loops around the board if they pass GO (index 0)
        // Update the player's balance if they pass GO
    }

    // Method to buy a property
    buyProperty(property: any) {
        this.properties.push(property);
        // Deduct the property's price from the player's balance
        // Add the property to the player's properties array
    }

    // Method to handle the effects of a chance/community chest card
    handleCard(card: any) {
        // Implement the effects of the drawn card on the player
    }

    // Method to pay rent to another player when landing on their property
    payRent(owner: string, rentAmount: number) {
        // Deduct the rent amount from the player's balance
        // Add the rent amount to the property owner's balance
    }

    // Method to update the player's balance (e.g., when receiving money from a card, etc.)
    updateBalance(amount: number) {
        this.balance = amount;
        // Add or deduct the given amount from the player's balance
    }

    // Method to handle the player's turn actions
    handleTurn() {
        // Listen for player's actions (e.g., roll dice, buy property, end turn, etc.)
        // Communicate with the server to process the player's actions
    }

    override recieveJson(json: PlayerJSON): this {
        super.recieveJson(json);
        this.jailTurnsRemaining = json.jailTurnsRemaining;
        return this;
    }
}
