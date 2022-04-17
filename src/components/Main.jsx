import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Cards";
import EditForm from "./EditForm";
import { trash } from "./Pics";
import Snack from "./Snack";

const url = "http://localhost:8000";
const headers = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

const Main = () => {
  const [allTasks, setTask] = useState([]);
  const [newText, setNewText] = useState("");
  const [text, setText] = useState("");
  const [note, setNoteText] = useState("");
  const [type, setTypeSnack] = useState("error");
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [indexEditTask, setIndexEditTask] = useState(-1);

  useEffect(() => {
    axios
      .get(`${url}/allTasks`)
      .then(response => {
        setTask(response.data.data);
      })
      .catch(error => {
        setSnackOpen(true);
        setTypeSnack("error");
        setNoteText("что то пошло не так ((");
      });
  }, []);

  const updateValues = (_id, newText, isCheck) => {
    const text = newText;
    const body = { _id, text, isCheck };
    axios
      .patch(`${url}/updateTask`, body, {
        headers,
      })
      .then(result => {
        if (Array.isArray(result.data.data)) {
          setIndexEditTask(-1);
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
        setNoteText("что то пошло не так ((");
      });
  };

  const deleteAllTasks = async () => {
    axios.delete(`${url}/deleteAll`).then(result => {
      setTask(result.data.data);
    });
  };
  const createTask = () => {
    const tmpText = text.trim();
    if (tmpText) {
      axios
        .post(`${url}/createTask`, {
          text: tmpText,
          isCheck: false,
        })
        .then(response => {
          if (Array.isArray(response.data.data)) {
            setTask(response.data.data);
          } else {
            setSnackOpen(true);
            setTypeSnack("error");
            setNoteText(response);
          }
        })
        .catch(error => {
          setSnackOpen(true);
          setTypeSnack("error");
          setNoteText(error.data);
        });
    }
  };

  allTasks.sort((a, b) => {
    return a.isCheck - b.isCheck;
  });

  return (
    <div id='container'>
      <div id='header'>
        <h1>To-do-lists</h1>
        <input
          type='text'
          id='inpCreator'
          autoFocus
          className='posR'
          placeholder='Наименование задачи'
          title='Создание новой задачи'
          onKeyUp={e => {
            if (e.keyCode === 13) {
              createTask();
              e.target.value = "";
            }
            setText(e.target.value);
          }}
        />
        <button
          id='but1'
          title='Создать новую задачу'
          onClick={() => createTask()}>
          Add
        </button>
        <div
          className='control'
          id='leftControl'
          title='Удалить все задачи'>
          <i id='deleteAll' onClick={deleteAllTasks}>
            {trash}
          </i>
        </div>
        <h2>Output will be here</h2>
      </div>
      <div id='output'>
        {allTasks.map((task, index) => (
          <div className='task' key={`task-${index}`}>
            {index !== indexEditTask && (
              <Card
                index={index}
                task={task}
                setIndexEditTask={setIndexEditTask}
                url={url}
                setTask={setTask}
                setNoteText={setNoteText}
                setTypeSnack={setTypeSnack}
                updateValues={updateValues}
              />
            )}
            {index === indexEditTask && (
              <EditForm
                task={task}
                setIndexEditTask={setIndexEditTask}
                setNewText={setNewText}
                newText={newText}
                url={url}
                updateValues={updateValues}
              />
            )}
          </div>
        ))}
      </div>
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
export default Main;
