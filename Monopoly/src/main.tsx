import ReactDOM from "react-dom/client";
// @ts-ignore
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";
import Gallery from "./Pages/Galery/gallery.tsx";
import Home from "./Pages/Home/home.tsx";
import { useEffect } from "react";

function Error() {
    useEffect(() => {
        setTimeout(() => {
            document.location.href = "/Monopoly";
        }, 3000);
    }, []);
    return (
        <>
            <h3>Error - This Site Doesnt Exists!</h3>
            <p>redirecting you to the home page</p>
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "Monopoly",
        element: <Home />,
    },
    {
        path: "Monopoly/gallery",
        element: <Gallery />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

document.title = "Monopoly";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
