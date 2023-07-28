import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./assets/styles/styles.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
