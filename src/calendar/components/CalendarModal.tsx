import Modal from "react-modal";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hooks';
registerLocale( 'es', es );

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement( '#root' );

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  //const [ isOpen, setIsOpen ] = useState<boolean>( true );
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { activeEvent, startSavingEvent } = useCalendarStore();

  
  const [ formValues, setFormValues ] = useState( {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 4 ), // añadir cuatro horas a la fecha
    bgColor: '#017551'
  } );
  
  const titleClass = useMemo(() => {
    if(!formSubmitted){
      return '';
    }
    return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';
    
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if(activeEvent !== null){
      setFormValues({...activeEvent});
    }
  }, [activeEvent])
  
  const onInputChange = ( { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {

    console.log( event );
    setFormValues( () => {
      return {
        ...formValues,
        [ target.name ]: target.value,
      };
    } );
  };

  type Changing = 'start' | 'end';

  const onDateChange = ( event: Date, changing: Changing ) => {
    console.log( changing );
    setFormValues( () => {
      return {
        ...formValues,
        [ changing ]: event,
      };
    } );
  };

  const onSubmit = async (event:FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true); // set form submitted to true

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if(isNaN( difference ) || difference <= 0 || difference > 14400){
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return
    }

    if(formValues.title.length <= 0)return;
    await startSavingEvent(formValues);
    // Cerrar modal
    closeDateModal();
    // remover errores
    setFormSubmitted(false);

  }

  const onCloseModal = () => {
    //setIsOpen( false );
    closeDateModal();
  };

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={ 200 }
    >
      <h3> Nuevo evento </h3>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label className="me-2">Fecha y hora inicio: </label>
          <DatePicker locale="es" timeCaption="hora" showTimeSelect selected={ formValues.start } className="form-control" onChange={ ( event ) => onDateChange( event!, 'start' ) } dateFormat="Pp" />
        </div>

        <div className="form-group mb-2">
          <label className="me-2">Fecha y hora fin: </label>
          <DatePicker locale="es" timeCaption="hora" showTimeSelect minDate={ formValues.start } selected={ formValues.end } className="form-control" onChange={ ( event ) => onDateChange( event!, 'end' ) } dateFormat="Pp" />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  );
};