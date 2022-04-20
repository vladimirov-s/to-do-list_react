import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { pics } from "./Pics";

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
  const history = useNavigate();
  const params = useParams();
  const { text, _id, isCheck = false } = task;

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
    <div id={_id} className="task-content">
      <input
        className="checkbox"
        type="checkbox"
        checked={isCheck}
        onChange={() => {
          setIndexEditTask(_id);
          updateValues(_id, "", !isCheck);
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
          title="Edit"
          onClick={() => {
            history(`/edit${_id}`);
          }}>
          {pics.edit}
        </i>
      ) : (
        false
      )}
      <i
        title="Delete"
        onClick={() => imageDeleteOneTask(_id)}>
        {pics.close}
      </i>
    </div>
  );
};
export default Card;
