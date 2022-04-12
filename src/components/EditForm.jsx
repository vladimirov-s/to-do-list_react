import React, { useEffect, useState } from "react"

const EditForm = ({ task }) => {
  const { text, id } = task
  return (
    <div className="editTask">
      <input
        id={`input-${id}`}
        type="text"
        title="ESC для отмены, ENTER для ввода"
        placeholder="Редактирование задачи"
        value={text}
      />
      <button>Save</button>
      <button>Cancel</button>
    </div>
  )
}

export default EditForm
