import React, { useCallback, useState } from 'react'
import './TodoItem.css';

function formatDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  // const hours = String(date.getHours()).padStart(2, '0');
  // const minutes = String(date.getMinutes()).padStart(2, '0');
  // const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const TodoItem = (props) => {
  const { title, description, author, dateCreated, complete, dateCompleted } = props.item
  const [checked, setChecked] = useState(complete)
  const [completedAt, setCompletedAt] = useState(dateCompleted)

  const handleChange = useCallback(() => {
    if (checked) {
      setCompletedAt('')
    } else {
      setCompletedAt(formatDateString(new Date()))
    }
    setChecked(!checked)
  }, [checked])

  return (
    <div className='item-wrapper'>
      <div className='left' data-checked={checked}>
      <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className='checkbox'
        />
        <div><span style={{ fontWeight: 600 }}>{title}</span>{description ? <span>({description})</span> : null}</div>
      </div>
      {completedAt ? <div className='complete'>Completed at: {completedAt}</div> : null}
    </div>
  )
}