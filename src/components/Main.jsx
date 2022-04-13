import React, { useEffect, useState } from "react"
import axios from "axios"
import Card from "./Cards"
import EditForm from "./EditForm"
import { trash } from "./Pics"

const url = "http://localhost:8000"
const headers = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*",
}

const Main = () => {
  const [allTasks, setTask] = useState([])
  const [newText, setNewText] = useState("")
  const [text, setText] = useState("")
  const [indexEditTask, setIndexEditTask] =
    useState(-1)
  useEffect(() => {
    axios
      .get(`${url}/allTasks`)
      .then((response) => {
        setTask(response.data.data)
      })
      .catch((error) => {
        console.warn(error)
      })
  }, [])
  const handleChangeInfoTask = (newTask) => {
    const { _id } = newTask
    const temparr = allTasks.map((elem) => {
      if (elem._id === _id) {
        elem = newTask
      }

      return elem
    })
    setIndexEditTask(-1)
    setTask([...temparr])
  }

  const updateValues = (_id, newText, isCheck) => {
    const text = newText
    const body = { _id, text, isCheck }
    axios
      .patch(`${url}/updateTask`, body, {
        headers,
      })
      .then((result) => {
        handleChangeInfoTask(body)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  const deleteAllTasks = async () => {
    axios
      .delete(`${url}/deleteAll`)
      .then((result) => setTask(result.data.data))
  }
  const createTask = () => {
    if (text) {
      axios
        .post(`${url}/createTask`, {
          text: text,
          isCheck: false,
        })
        .then(function (response) {
          setTask(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  allTasks.sort((a, b) => {
    return a.isCheck - b.isCheck
  })
  return (
    <div id="container">
      <div id="header">
        <h1>To-do-lists</h1>
        <input
          type="text"
          id="inpCreator"
          autoFocus
          className="posR"
          placeholder="Наименование задачи"
          title="Создание новой задачи"
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              createTask()
              e.target.value = ""
            }
            setText(e.target.value)
          }}
        />
        <button
          id="but1"
          title="Создать новую задачу"
          onClick={() => createTask()}>
          Add
        </button>
        <div
          className="control"
          id="leftControl"
          title="Удалить все задачи">
          <i id="deleteAll" onClick={deleteAllTasks}>
            {trash}
          </i>
        </div>
        <h2>Output will be here</h2>
      </div>
      <div id="output">
        {allTasks.map((task, index) => (
          <div className="task" key={`task-${index}`}>
            {index !== indexEditTask && (
              <Card
                index={index}
                task={task}
                setIndexEditTask={setIndexEditTask}
                url={url}
                setTask={setTask}
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
                handleChangeInfoTask={
                  handleChangeInfoTask
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Main
