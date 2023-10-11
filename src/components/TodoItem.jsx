import React, { useCallback } from 'react'
import './TodoItem.css'

function formatDateString(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

function TodoItem(props) {
    const { title, description, author, dateCreated, complete, dateCompleted } = props.item

    const handleChange = useCallback(() => {
        const newData = { title }
        if (complete) {
            newData.dateCompleted = null
        } else {
            newData.dateCompleted = new Date()
        }
        newData.complete = !complete
        props.onChangeComplete(newData)
    }, [complete, props, title])

    return (
        <div className="item-wrapper">
            <div className="left" data-checked={complete}>
                <input
                    type="checkbox"
                    checked={complete}
                    onChange={handleChange}
                    className="checkbox"
                />
                <div>
                    <span style={{ fontWeight: 600 }}>{title}</span>
                    {description ? <span>({description})</span> : null}
                </div>
            </div>
            <div className="right">
                <div>
                    Created by {author} at {formatDateString(dateCreated)}
                </div>
                {dateCompleted ? (
                    <div>Completed at: {formatDateString(dateCompleted)}</div>
                ) : null}
            </div>
        </div>
    )
}
export default TodoItem
