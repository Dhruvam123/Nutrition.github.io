import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./components/SocketContext.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";



const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<AuthProvider><App /></AuthProvider>);
