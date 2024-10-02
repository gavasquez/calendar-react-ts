import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarRouter } from '../calendar';
import { AuthRouter } from '../auth';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

//type Status = 'authenticated' | 'not-authenticated' | 'checking';

export const AppRouter = () => {

  const { status ,checkAuthToken } = useAuthStore();
  
  //const authStatus:Status = 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);
  

  if(status === 'checking'){
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
        { 
          (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/*" element={<AuthRouter />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<CalendarRouter />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )
        } 
    </Routes>
  )
}