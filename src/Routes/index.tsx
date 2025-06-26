import { Route, Routes } from "react-router-dom"
import routes from "./Routes"


const Router:React.FC = () => {
    return (
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
    )
}

export default Router;