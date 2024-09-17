import { Route, Routes } from 'react-router-dom';
import { CalendarPage } from '../pages/CalendarPage';

export const CalendarRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<CalendarPage />} />
    </Routes>
  );
};

