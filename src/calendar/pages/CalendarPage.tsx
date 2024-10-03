import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../components/Navbar';
import { localizer, getMessagesEs } from '../../helpers';
import { useEffect, useState } from 'react';
import { CalendarModal, FabAddNew, CalendarEvent, FabDelete } from '../';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { Events } from '../interfaces/events.interfaces';

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { events , setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') as View || 'month'));

  const eventStyleGetter = (event: Events,
    start: Date,
    end: Date,
    isSelected: boolean,) => {
      const isMyEvent = (user?.uid === event.user?._id);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7': '#c62f2f',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event: Events) => {
    openDateModal();
  }

  const onSelect = ( event: Events) => {
    setActiveEvent(event)
  }

  const onViewChanged = ( event: View) => {
    localStorage.setItem('lastView', event); // Guardar la vista en el localStorage
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);
  
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
      <FabAddNew />
      <FabDelete />
    </>
  )
}