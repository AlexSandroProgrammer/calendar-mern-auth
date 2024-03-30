import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  // llamamos las propiedades y metodos del slice del calendar store
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  // funcion para despachar el metodo para borrar el evento con el reducer
  const handleClickDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      style={{ display: hasEventSelected ? "" : "none" }}
      onClick={handleClickDelete}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
