import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const Root = () => {
    return <App />;
};

if (document.getElementById("root")) {
    createRoot(document.getElementById("root")).render(<Root />);
}
