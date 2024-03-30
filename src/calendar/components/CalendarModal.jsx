//IMPORTACION DE HOOKS
import { useEffect, useMemo, useState } from "react";
//IMPORTACION DE SWEETALERT
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
//MODAL STYLES
import Modal from "react-modal";
import "../styles/modal.css";
//IMPORTACION DE DATEPICKER
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
export const CalendarModal = () => {
  // ESTADO PARA MANEJAR EL MODAL
  const { isDateModalOpen, closeDateModal } = useUiStore();

  // NOS TRAEMOS LA NOTA ACTIVA PARA MOSTRAR LOS DATOS EN EL MODAL
  const { activeEvent, startSavingEvent } = useCalendarStore();

  // ESTADO PARA MANEJAR EL FORMULARIO
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  //* creamos una funcion llamada fieldsClass el cual nos ayudara a manera las clases de bootstrap

  // las clases is-valid y is-invalid sirven para indicar al usuario el estado de los campos del formulario

  const fieldsClass = useMemo(() => {
    if (!formSubmitted) return " ";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  //
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  // funcion cambiar el valor de los inputs

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // funcion para cambiar el valor de la fecha
  const onInputDate = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmitEvent = async (event) => {
    // prevenimos que la pagina se recargue
    event.preventDefault();

    // el estado formulario ahora cambiara a formulario enviado
    setFormSubmitted(true);

    // creamos una variable para almacenar la diferencia en segundos
    // entre el tiempo final y el tiempo inicial del evento
    const difference = differenceInSeconds(formValues.end, formValues.start);

    // de acuerdo al valor de la variable validamos que si es menor o igual a 0 entonces
    // le salga una notificacion al usuario de que hay un error en las fecha
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    // validamos que la cantidad de caracteres del titulo y de las notas no sea menor 0 o si no
    // no deja hacer envio de los datos del formulario
    if (formValues.title.length <= 0 || formValues.notes.length <= 0) return;

    //* si ningun condicion se cumple entonces mostramos en la pantalla los datos enviados
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmitEvent}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            onChange={(event) => onInputDate(event, "start")}
            selected={formValues.start}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            className="form-control"
            onChange={(event) => onInputDate(event, "end")}
            selected={formValues.end}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
          />
        </div>

        <hr />

        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${fieldsClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className={`form-control`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
