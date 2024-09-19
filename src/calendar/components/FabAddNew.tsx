import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';


export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();


  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 4),
      bgColor: '#363c66',
      user: {
        _id: '1234567890',
        name: 'Juan'
      }
    });
    openDateModal();
  }


  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  )
}