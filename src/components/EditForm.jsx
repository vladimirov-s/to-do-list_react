import React from "react";

const EditForm = ({
  task,
  setNewText,
  newText,
  updateValues,
  handleChangeInfoTask,
}) => {
  const { text, _id } = task;
  return (
    <div className='editTask'>
      <input
        id={`input-${_id}`}
        autoFocus
        type='text'
        title='ESC для отмены, ENTER для ввода'
        placeholder='Редактирование задачи'
        defaultValue={text}
        onChange={e => {
          setNewText(e.target.value);
        }}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            updateValues();
          }
          setNewText(e.target.value);
        }}
      />
      <button
        onClick={() => updateValues(_id, newText)}>
        Save
      </button>
      <button
        onClick={() => {
          handleChangeInfoTask(_id);
        }}>
        Cancel
      </button>
    </div>
  );
};

export default EditForm;
