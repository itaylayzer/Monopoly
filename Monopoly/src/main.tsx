import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./Pages/Galery/gallery.tsx";
import Home from "./Pages/Home/home.tsx";
import { useEffect } from "react";

function Error() {
    useEffect(() => {
        setTimeout(() => {
            document.location.href = "/";
        }, 3000);
    }, []);
    return (
        <>
            <h3>Error - This Site Doesnt Exists!</h3>
            <p>redirecting you to the home page</p>
        </>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/home" element={<Home />} />
                <Route path="/play" element={<Home />} />
                <Route path="*" element={<Error />} /> {/* This route acts as the "exact" route */}
            </Routes>
        </Router>
    );
}

document.title = "Monopoly";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
