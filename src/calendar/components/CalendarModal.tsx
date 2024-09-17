import Modal from "react-modal";
import { useState } from 'react';

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

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Hola Mundo</h1>
      <hr />
      <p>Minim elit Lorem exercitation qui veniam magna ullamco tempor proident officia ullamco deserunt.</p>
    </Modal>
  )
}