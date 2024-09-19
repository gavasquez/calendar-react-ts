import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { Events } from '../calendar/interfaces/events.interfaces';


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( (state: RootState) => state.calendar);


  const setActiveEvent = (calendarEvent: Events) => {
    dispatch(onSetActiveEvent( calendarEvent ));
  }

  const startSavingEvent = async (calendarEvent: Events) => {
    //Todo: LLegar al Backend

    // Todo: Todo bien
    if(calendarEvent._id){
      // Actulizando
      dispatch(onUpdateEvent({...calendarEvent})); // Se hace para romper la referencia
    }else {
      // Creando
      dispatch(onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ));
    }
  }


  return {
    //* Propiedades
    activeEvent,
    events,
    //* Metodos
    setActiveEvent,
    startSavingEvent,
  };
}