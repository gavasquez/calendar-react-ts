import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { CalendarApp } from './CalendarApp.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>,
)
