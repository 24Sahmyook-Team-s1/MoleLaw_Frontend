import { Navigate } from "react-router-dom";
import MainView from "../Views/MainView";
import type { ReactElement } from "react";

interface RouteConfig {
    path: string;
    element: ReactElement;
    name: string;
}

const routes : RouteConfig[] = [
    {
        path: "/",
        element: <Navigate to="/Main" replace />,
        name: "Rediect",
    },
    {
        path: "/Main",
        element: <MainView/>,
        name: "MainView"
    }
];

export default routes;