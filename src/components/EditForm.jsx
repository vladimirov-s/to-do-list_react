import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Snack from "./Snack";

const EditForm = ({}) => {
  const [isSnackOpen, setSnackOpen] = useState(false);
  const history = useNavigate();
  const [type, setTypeSnack] = useState("error");
  const [note, setNoteText] = useState("");
  const url = "http://localhost:8000";
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  const [newText, setNewText] = useState("");
  const [text, setText] = useState("");

  const [task, setTask] = useState({
    text: "",
    _id: "",
    isCheck: false,
  });

  const { editId } = useParams();
  useEffect(() => {
    axios
      .get(`${url}/getOneTask?id=${editId}`)
      .then((res, err) => {
        if (res) {
          setTask(res.data.data);
        }
      })
      .catch(err => {
        setSnackOpen(true);
        setTypeSnack("error");
        setNoteText(
          "Нормальное название своему заданию давай."
        );
      });
  }, []);

  const updateValues = (_id, newText) => {
    const text = newText;
    const body = { _id, text };
    axios
      .patch(`${url}/updateTask`, body, {
        headers,
      })
      .then(result => {
        if (Array.isArray(result.data.data)) {
          history("/");
          setTask(result.data.data);
        } else {
          setSnackOpen(true);
          setTypeSnack("error");
          setNoteText(
            "Нормальное название своему заданию давай."
          );
        }
      })
      .catch(err => {
        setSnackOpen(true);
        setTypeSnack("error");
        setNoteText("Text field can not be empty");
      });
  };

  return (
    <div id='container'>
      <h2>Edit task</h2>
      <input
        autoFocus
        type='text'
        title='ESC для отмены, ENTER для ввода'
        placeholder='Редактирование задачи'
        defaultValue={task.text}
        onChange={e => {
          setNewText(e.target.value);
        }}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            updateValues();
          } else if (e.keyCode === 27) {
            history("/");
          }
          setNewText(e.target.value);
        }}
      />
      <button onClick={() => updateValues(task._id, newText)}>
        Save
      </button>
      <button onClick={() => history("/")}>Cancel</button>
      <Snack
        open={isSnackOpen}
        string={note}
        type={type}
        handleClose={() => {
          setSnackOpen(false);
        }}
      />
    </div>
  );
};

export default EditForm;
