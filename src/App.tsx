import './App.css'
import { Global } from '@emotion/react'
import { GlobalStyles } from './style/GlobalStyle'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './Routes/Routes'


function App() {

  return (
    <>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
    )
}

export default App
