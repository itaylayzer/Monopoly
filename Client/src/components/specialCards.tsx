export interface ChanceDisplayInfo {
    title: string;
}

export default function selector({
    chance,
    chest,
}: {
    chance?: ChanceDisplayInfo;
    chest?: ChanceDisplayInfo;
}) {
    if (chance !== undefined) {
        return <ChanceCard args={chance} />;
    } else if (chest !== undefined) {
        return <CChestCard args={chest} />;
    } else {
        return <></>;
    }
}
function ChanceCard({ args }: { args: ChanceDisplayInfo }) {
    return (
        <div data-b-image={"chance"} className="chance-card">
            <div></div>
            <div>
                <h3>{args.title}</h3>
            </div>
            <div></div>
        </div>
    );
}
function CChestCard({ args }: { args: ChanceDisplayInfo }) {
    return (
        <div data-b-image={"chest"} className="chance-card">
            <div></div>
            <div>
                <h3>{args.title}</h3>
            </div>
            <div></div>
        </div>
    );
}
