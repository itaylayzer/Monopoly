export interface StreetDisplayInfo {
    title: string;
    rent: number;
    rentWithColorSet: number;
    multpliedrent: [number, number, number, number, number];
    housesCost: number;
    hotelsCost: number;
    cardCost: number;
    group:string
}

export interface UtilitiesDisplayInfo {
    title: string;
    rent: number;
    rentWithColorSet: number;
    multpliedrent: [number, number, number, number, number];
    housesCost: number;
    hotelsCost: number;
    cardCost: number;
    group:string
}
export default function streetCard({args, type
}: {args:StreetDisplayInfo | UtilitiesDisplayInfo, type :"Street" | "Utilities"}) {
    return type == "Street" ? (
        <div className="street-card">
            <div style={{backgroundColor:args.group}}>
                <p>title dreed</p>
                <h3>{args.title}</h3>
            </div>
            <div>
                <ol>
                    <li>
                        <p>Rent</p>
                        <p>{args.rent}M</p>
                    </li>
                    <li>
                        <p>Rent with color set</p>
                        <p>{args.rentWithColorSet}M</p>
                    </li>
                    <li>
                        <p>Rent with 1 house</p>
                        <p>{args.multpliedrent[0]}M</p>
                    </li>
                    <li>
                        <p>Rent with 2 houses</p>
                        <p>{args.multpliedrent[1]}M</p>
                    </li>
                    <li>
                        <p>Rent with 3 houses</p>
                        <p>{args.multpliedrent[2]}M</p>
                    </li>
                    <li>
                        <p>Rent with 4 houses</p>
                        <p>{args.multpliedrent[3]}M</p>
                    </li>
                    <li>
                        <p>Rent with hotel</p>
                        <p>{args.multpliedrent[4]}M</p>
                    </li>
                </ol>
                <hr />
                <ol>
                    <li>
                        <p>House cost</p>
                        <p>{args.housesCost}M each</p>
                    </li>
                    <li>
                        <p>Hotels cost</p>
                        <p>
                            {args.hotelsCost}M each
                            <br />
                            <p style={{ fontSize: 12 }}>(plus 4 houses)</p>
                        </p>
                    </li>
                </ol>

                <br />
                <hr />
                <h4>{args.cardCost}M</h4>
            </div>
        </div>
    ) : (
        <div className="street-card">
            <div style={{backgroundColor:args.group}}>
                <p>title dreed</p>
                <h3>{args.title}</h3>
            </div>
            <div>
                <ol>
                    <li>
                        <p>Rent</p>
                        <p>{args.rent}M</p>
                    </li>
                    <li>
                        <p>Rent with color set</p>
                        <p>{args.rentWithColorSet}M</p>
                    </li>
                    <li>
                        <p>Rent with 1 house</p>
                        <p>{args.multpliedrent[0]}M</p>
                    </li>
                    <li>
                        <p>Rent with 2 houses</p>
                        <p>{args.multpliedrent[1]}M</p>
                    </li>
                    <li>
                        <p>Rent with 3 houses</p>
                        <p>{args.multpliedrent[2]}M</p>
                    </li>
                    <li>
                        <p>Rent with 4 houses</p>
                        <p>{args.multpliedrent[3]}M</p>
                    </li>
                    <li>
                        <p>Rent with hotel</p>
                        <p>{args.multpliedrent[4]}M</p>
                    </li>
                </ol>
                <hr />
                <ol>
                    <li>
                        <p>House cost</p>
                        <p>{args.housesCost}M each</p>
                    </li>
                    <li>
                        <p>Hotels cost</p>
                        <p>
                            {args.hotelsCost}M each
                            <br />
                            <p style={{ fontSize: 12 }}>(plus 4 houses)</p>
                        </p>
                    </li>
                </ol>

                <br />
                <hr />
                <h4>{args.cardCost}M</h4>
            </div>
        </div>
    )
    ;
}
