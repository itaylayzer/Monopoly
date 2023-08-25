import { useEffect } from "react";
import "../../gallery.css";
export default function Gallery() {
    useEffect(() => {
        document.title = "Monopoly Gallery";
    }, []);
    return (
        <main>
            <div className="gallery-main">
                {["1.PNG", "2.PNG", "3.PNG", "4.PNG", "5.PNG", "6.PNG", "7.PNG", "8.PNG"].map((v) => (
                    <img
                        key={v}
                        src={"Monopoly/gallery/" + v}
                        onClick={() => {
                            document.location.href = "/gallery/" + v;
                        }}
                    />
                ))}
            </div>
        </main>
    );
}
