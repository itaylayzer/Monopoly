export interface ChanceDisplayInfo {
    title: string;
    action:string;
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
        return <ChanceCard args={chest} />;
    } else {
        return <></>;
    }
}
function ChanceCard({ args }: { args: ChanceDisplayInfo }) {
    return (
        <div className="chance-card">
            <div></div>
            <div>
            <h3>{args.title}</h3>
            <p>{args.action}</p>
            </div>
            <div></div>
        </div>
    );
}
