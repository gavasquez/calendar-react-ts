import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import { Events } from '../../calendar/interfaces/events.interfaces';

export interface CalendarState {
  events: Events[],
  activeEvent: Events | null
}

const tempEvent: Events  = 
  {
    _id: new Date().getTime(),
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 4),
    bgColor: '#8f6969',
    user: {
      _id: '1234567890',
      name: 'Juan'
    }
  };


export const calendarSlice = createSlice({
  name: 'ui',
  initialState: {
    events: [
      tempEvent
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
        if(event._id  === action.payload._id) {
          return action.payload;
        }
        return event;
      });
    }
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;