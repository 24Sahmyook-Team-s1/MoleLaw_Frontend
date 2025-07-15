import './App.css'
import { Global } from '@emotion/react'
import { GlobalStyles } from './style/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/index'
import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from "./store/storeIndex"
import LoginPanel from './Components/Feature/LoginSystem/LoginPanel'

interface props{
  children : ReactNode;
}

const ProtectedRoute:React.FC<props> = ({children}) => {
  const {isAuthenticated, checkAuthStatus, refreshToken, user} = useAuthStore();
  
  const [isInitialized, setInitialized] = useState(false);

  //Authentication System
  useEffect(() => {
    const verifyAuth = async () => {
      try{
        await checkAuthStatus();
      }catch{
        return;
      } 
      finally {
        setInitialized(true);
      }
    }

    if(!isInitialized){
      verifyAuth();
    }
  }, [checkAuthStatus,isInitialized])


  //Token Refresh System
  useEffect(() => {
    if (!user) return;

    refreshToken();

    const intervalID = setInterval(() => {
      refreshToken();
    }, 14*60*1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [user, refreshToken]);

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
