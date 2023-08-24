import StreetCard, { RailroadDisplayInfo, UtilitiesDisplayInfo, StreetDisplayInfo } from "./streetCard";
import monopolyJSON from "../../assets/monopoly.json";

export default function CardViewer(props: { posistion: number; OnClick: React.MouseEventHandler<HTMLDivElement>; style?: React.CSSProperties }) {
    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );
    let stretDisplay = {};
    let stretType: "Street" | "Utilities" | "Railroad" = "Utilities";

    const x = propretyMap.get(props.posistion);
    if (x) {
        if (x.group === "Special") {
            return <></>;
        } else if (x.group === "Utilities") {
            stretType = "Utilities";
            const streetInfo = {
                cardCost: x.price ?? -1,
                title: x.name ?? "error",
                type: x.id.includes("water") ? "water" : "electricity",
            } as UtilitiesDisplayInfo;
            stretDisplay = streetInfo;
        } else if (x.group === "Railroad") {
            stretType = "Railroad";
            const streetInfo = {
                cardCost: x.price ?? -1,
                title: x.name ?? "error",
            } as RailroadDisplayInfo;
            stretDisplay = streetInfo;
        } else {
            stretType = "Street";
            const streetInfo = {
                cardCost: x.price ?? -1,
                hotelsCost: x.ohousecost ?? -1,
                housesCost: x.housecost ?? -1,
                rent: x.rent ?? -1,
                multpliedrent: x.multpliedrent ? [x.multpliedrent[0] ?? -1, x.multpliedrent[1] ?? -1, x.multpliedrent[2] ?? -1, x.multpliedrent[3] ?? -1, x.multpliedrent[4] ?? -1] : [-1, -1, -1, -1, -1],
                rentWithColorSet: x.rent ? x.rent * 2 : -1,
                title: x.name ?? "error",
                group: x.group,
            } as StreetDisplayInfo;
            stretDisplay = streetInfo;
        }

        return (
            <div style={props.style} onClick={props.OnClick}>
                {stretType === "Railroad" ? <StreetCard railroad={stretDisplay as RailroadDisplayInfo} /> : stretType === "Utilities" ? <StreetCard utility={stretDisplay as UtilitiesDisplayInfo} /> : <StreetCard street={stretDisplay as StreetDisplayInfo} />}
            </div>
        );
    }
}
