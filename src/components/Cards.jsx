import React, { useEffect, useState } from "react";

const Card = ({ text, checkbox, id }) => {
  const [newText, setNewText] = useState("");
  const [oldText, setOldText] = useState(text);
  let [isCheck, setNewProperty] = useState(Boolean);
  const updateValue = (event) => {
    console.log(isCheck);
    const buttontEdit = document.createElement("button");
    const cancelButton = document.createElement("button");
    const editInput = document.createElement("input");
    editInput.id = `input-${id}`;
    const wrapForEdit = document.createElement("div");
    wrapForEdit.classList.add("editTask");
    cancelButton.innerText = "Cancel";
    buttontEdit.innerText = "Save";
    editInput.type = "text";
    editInput.value = oldText;
    editInput.title = "ESC для отмены, ENTER для ввода";
    editInput.placeholder = "Редактирование задачи";
    wrapForEdit.appendChild(editInput);
    wrapForEdit.appendChild(buttontEdit);
    wrapForEdit.appendChild(cancelButton);
    // container.appendChild(wrapForEdit);
    editInput.focus();
  };
  const imageDeleteOneTask = () => {};
  return (
    <div id={id} className="task">
      <input
        type="checkbox"
        defaultChecked={checkbox}
        onChange={() => {
          setNewProperty((checkbox = !checkbox));
          updateValue();
        }}
      />
      <p id={`text-${id}`} className="text-task">
        {text}
      </p>
      <i title="Edit" onClick={() => updateValue()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
        </svg>
      </i>
      <i title="Delete" onClick={imageDeleteOneTask()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z" />
        </svg>
      </i>
    </div>
  );
};

export default Card;
