import { parseISO } from 'date-fns';
import { Events } from '../calendar/interfaces/events.interfaces';


export const convertEventsToDateEvents = (events: Events[] = []) => {

  return events.map( event => {
    event.start = parseISO(event.start.toString());
    event.end = parseISO(event.end.toString());
    return event;
  });
  
}