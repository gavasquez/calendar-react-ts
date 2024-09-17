import { EventProps } from 'react-big-calendar';
import { Events } from '../pages/CalendarPage';


export const CalendarEvent = ({ event }: EventProps<Events>) => {
  const  { title, user } = event;

  return (
    <>
      <strong>{ title }</strong>
      <span> - {`${user.name}`}</span>
    </>
  )
}