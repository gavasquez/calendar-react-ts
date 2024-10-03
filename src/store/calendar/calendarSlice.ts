import { createSlice } from '@reduxjs/toolkit';
/* import { addHours } from 'date-fns'; */
import { Events } from '../../calendar/interfaces/events.interfaces';

export interface CalendarState {
  events: Events[],
  activeEvent: Events | null,
  isLoadingEvents: boolean,
}

/* const tempEvent: Events  = 
  {
    id: new Date().getTime(),
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 4),
    bgColor: '#8f6969',
    user: {
      id: '1234567890',
      name: 'Juan'
    }
  }; */


export const calendarSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoadingEvents: true, // carga de eventos
    events: [
      /* tempEvent */
    ],
    activeEvent: null
  } as CalendarState,
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload); // Insertar la nota
      state.activeEvent = null; // Limpiar el evento activo
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map(event => {
        if(event.id  === action.payload.id) {
          return action.payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if(state.activeEvent){
        state.events = state.events.filter(  event => event.id !== state.activeEvent?.id );
        state.activeEvent = null;
      }
    },
    onLoadEvent: (state, action) => {
      state.isLoadingEvents = false;
      action.payload.forEach((event: Events) => {
        const exist = state.events.some(e => e.id === event.id); // El some regresa un booleano
        if(!exist){
          state.events.push( event ); // Insertamos el evento
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
    }
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvent, onLogoutCalendar } = calendarSlice.actions;