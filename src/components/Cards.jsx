import React from "react";
import axios from "axios";
import { close, edit } from "./Pics";

const Card = ({
  index,
  task,
  setIndexEditTask,
  url,
  setTask,
  updateValues,
  setSnackOpen,
  setNoteText,
  setTypeSnack,
}) => {
  const { text, _id, isCheck = false } = task;

  const updateTextValue = index => {
    setIndexEditTask(index);
  };

  const imageDeleteOneTask = id => {
    axios
      .delete(`${url}/deleteTask?id=${id}`)
      .then(result => {
        setTask(result.data.data);
      })
      .catch(error => {
        setSnackOpen(true);
        setTypeSnack("error");
        setNoteText("что то пошло не так ((");
      });
  };

  return (
    <div id={_id} className='task-content'>
      <input
        className='checkbox'
        type='checkbox'
        checked={isCheck}
        onChange={() => {
          setIndexEditTask(_id);
          updateValues(_id, text, !isCheck);
        }}
      />
      <p
        id={`text-${_id}`}
        className={
          !isCheck ? "text-task" : "text-task done-text"
        }>
        {text}
      </p>
      {!isCheck ? (
        <i
          title='Edit'
          onClick={() => updateTextValue(index)}>
          {edit}
        </i>
      ) : (
        false
      )}
      <i
        title='Delete'
        onClick={() => imageDeleteOneTask(_id)}>
        {close}
      </i>
    </div>
  );
};
export default Card;
