import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
const WIN_MESSAGE = ["Awesome", "Nice", "Good", "Marvelous", "Fantastic"];

const Modal = ({ isWon, solution, autoClose, toast, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    delay ? setTimeout(() => setIsOpen(true), 2000) : setIsOpen(true);
  }, []);

  useEffect(() => {
    autoClose && setTimeout(() => handleClose(), delay ? 5500 : 3500);
  }, []);

  const className = isWon ? "blue" : "red";

  const getMessage = () => {
    if (isWon)
      return WIN_MESSAGE[Math.floor(Math.random() * WIN_MESSAGE.length)] + "!";
    else if (toast) return toast;
    else return `The word was ${solution.toUpperCase()}`;
  };

  return ReactDOM.createPortal(
    <>
      {isOpen ? (
        <div className={`modal ${className}`}>
          {getMessage()}

          {!autoClose && (
            <button className="close" onClick={handleClose}>
              X
            </button>
          )}
        </div>
      ) : null}
    </>,
    document.querySelector("#portal")
  );
};

export default Modal;
