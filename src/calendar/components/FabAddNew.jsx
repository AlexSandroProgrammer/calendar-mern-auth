import React from "react";
import { useUiStore, useCalendarStore } from "../../hooks";
import { addHours } from "date-fns";

export const FabAddNew = () => {
  // llamamos las propiedades y metodo del slice del modal
  const { openDateModal } = useUiStore();

  // llamamos las propiedades y metodos del slice del calendar store
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Usuario",
      },
    });
    openDateModal();
  };
  return (
    <button onClick={handleClickNew} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
