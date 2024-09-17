import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarRouter } from '../calendar';
import { AuthRouter } from '../auth';

type Status = 'authenticated' | 'not-authenticated' | 'checking';

export const AppRouter = () => {

  const authStatus:Status = 'not-authenticated';

  return (
    <Routes>
        { 
          (authStatus !== 'not-authenticated')
          ? <Route path="/auth/*" element={<AuthRouter />} />
          : <Route path="/*" element={<CalendarRouter />} />
        } 
        <Route path="/*" element={<Navigate to={authStatus === 'not-authenticated' ? "/auth/login" : "/"} />} />
    </Routes>
  )
}