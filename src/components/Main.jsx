import React, { useEffect, useState } from "react"
import axios from "axios"
import Card from "./Cards"
import EditForm from "./EditForm"

const url = "http://localhost:8000"

const Main = () => {
  const [allTasks, setTask] = useState([])
  const [isCheck, setCheckbox] = useState(Boolean)
  const [text, setText] = useState("")
  const [indexEditTask, setIndexEditTask] =
    useState(-1)
  useEffect(() => {
    axios
      .get(`${url}/allTasks`)
      .then(function (response) {
        setTask(response.data.data)
      })
      .catch(function (error) {
        console.warn(error)
      })
  }, [])

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
          className="posR"
          placeholder="Наименование задачи"
          title="Создание новой задачи"
          onKeyUp={(e) => {
            if (e.keyCode == 13) {
              createTask()
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
          <svg
            id="deleteAll"
            onClick={deleteAllTasks}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
            <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
          </svg>
        </div>
        <h2>Output will be here</h2>
      </div>
      <div id="output">
        {allTasks.map((task, index) => (
          //передаем каждый таск, индекс и флаг в виде стейта в компонент
          <div className="task" key={`task-${index}`}>
            {index !== indexEditTask && (
              <Card
                index={index}
                task={task}
                setIndexEditTask={setIndexEditTask}
              />
            )}
            {index === indexEditTask && (
              <EditForm
                task={task}
                setIndexEditTask={setIndexEditTask}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Main
