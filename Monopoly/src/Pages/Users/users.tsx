import { useEffect, useState } from "react";
import "../../users.css";
export default function Gallery() {
    useEffect(() => {
        document.title = "Monopoly Users";
    }, []);
    const [tabIndex, SetTab] = useState<number>(0);
    return (
        <main className="users">
            <nav>
                <button
                    data-select={tabIndex === 0}
                    onClick={() => {
                        SetTab(0);
                    }}
                >
                    Friends
                </button>
                <button
                    data-select={tabIndex === 1}
                    onClick={() => {
                        SetTab(1);
                    }}
                >
                    Leaderboard
                </button>
            </nav>
            <main></main>
        </main>
    );
}
