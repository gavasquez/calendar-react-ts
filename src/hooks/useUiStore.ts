import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

export const useUiStore = () => {

  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector( (state: RootState) => state.ui);


  const openDateModal = () => {
    dispatch(onOpenDateModal());
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  }

  return {
    //* Propiedades
    isDateModalOpen,
    //* Metodos
    openDateModal,
    closeDateModal,
  };
}