import './App.css'
import { Global } from '@emotion/react'
import { GlobalStyles } from './style/GlobalStyle'
import { BrowserRouter } from 'react-router-dom'
import Router from './Routes'
import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from './store/states'
import LoginPanel from './Components/LoginSystem/LoginPanel'
//import LoginPanel from './Components/LoginPanel'

interface props{
  children : ReactNode;
}

const ProtectedRoute:React.FC<props> = ({children}) => {
  const {isAuthenticated, checkAuthStatus} = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus();
      console.log("Checking")
      setIsChecking(false);
    }
    verifyAuth()
  }, [checkAuthStatus])

  if(isChecking) {
    return <div className="flex h-screen items-center justify-center">인증 확인 중...</div>
  }

  if(!isAuthenticated){
    return (
      <>
        <LoginPanel/>
        {children}
      </>
  )}

  return children;
}

function App() {

  return (
    <>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <ProtectedRoute>
          <Router/>
        </ProtectedRoute>
      </BrowserRouter>
    </>
    )
}

export default App
