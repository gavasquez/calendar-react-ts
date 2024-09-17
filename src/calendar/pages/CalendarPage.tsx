import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../components/Navbar';
import { addHours } from 'date-fns';
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';


export interface Events {
  title: string,
  notes: string,
  start: Date,
  end: Date,
  bgColor: string,
  user: {
    _id: string,
    name: string
  }
}

const events: Events[] = [
  {
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#8f6969',
    user: {
      _id: '1234567890',
      name: 'Juan'
    }
  }
]


export const CalendarPage = () => {


  const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') as View || 'month'));

  const eventStyleGetter = (event: Events,
    start: Date,
    end: Date,
    isSelected: boolean,) => {
    console.log({event, start, end, isSelected});
    const style = {
      backgroundColor: '#8f6969',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = ( event: Events) => {
    console.log({ doubleClick: event});
  }

  const onSelect = ( event: Events) => {
    console.log({ click: event});
  }

  const onViewChanged = ( event: View) => {
    localStorage.setItem('lastView', event); // Guardar la vista en el localStorage
    setLastView(event);
  }


  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events as Events[]}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  )
}