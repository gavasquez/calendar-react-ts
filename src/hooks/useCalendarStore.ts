import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from '../store/calendar/calendarSlice';
import { Events } from '../calendar/interfaces/events.interfaces';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent,  } = useSelector( (state: RootState) => state.calendar);
  const { user } = useSelector( (state: RootState) => state.auth);


  const setActiveEvent = (calendarEvent: Events) => {
    dispatch(onSetActiveEvent( calendarEvent ));
  }

  const startSavingEvent = async (calendarEvent: Events) => {
    
    try {
      
      if(calendarEvent.id){
  
        // Actulizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
  
        dispatch(onUpdateEvent({...calendarEvent, user})); // Se hace para romper la referencia
        return;
      }
      
      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent );
      
      dispatch(onAddNewEvent( { ...calendarEvent, id: data.eventGuardado.id, user: user }));

    } catch (error: any) {
      
      Swal.fire('Error al guardar', error.response.data.msg , 'error');
    }
    
  }

  const startDeletingEvent = async () => {

    try {

      await calendarApi.delete(`/events/${activeEvent?.id}`);
      dispatch(onDeleteEvent());

    } catch (error: any) {

      Swal.fire('Error al eliminar', error.response.data.msg , 'error');

    }

  }

  const startLoadingEvents = async () => {

    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvent(events));

    } catch (error) {

      console.log(error)
      console.log('Error cargando eventos');

    }

  }

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    //* Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };

}