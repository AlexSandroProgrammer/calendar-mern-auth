import { onCloseDateModal, onOpenDateModal } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const useUiStore = () => {
  // variable para despachar cada uno de los metodos
  const dispatch = useDispatch();

  // Propiedades
  const { isDateModalOpen } = useSelector((state) => state.ui);

  // ------------------------ metodos ----------------------------------------------------

  // metodo para abrir el modal
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  // metodo para cerrar el modal
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    // Propiedades
    isDateModalOpen,

    // Metodos
    openDateModal,
    closeDateModal,
  };
};
