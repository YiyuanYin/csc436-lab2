import React, { useContext } from 'react'
import { StateContext } from '../contexts';
import './TodoItem.css'
import { Button } from 'react-bootstrap';

function formatDateString(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

function TodoItem(props) {
    const { title, description, dateCreated, complete, dateCompleted, id } = props.item
    const { state, dispatch } = useContext(StateContext);

    const handleToggleTodo = (todoId) => {
        dispatch({
            type: 'TOGGLE_TODO',
            id: todoId,
        })
    }

    const handleDeleteTodo = (todoId) => {
        dispatch({
            type: 'DELETE_TODO',
            id: todoId,
        })
    }

    return (
        <div className="item-wrapper">
            <div className="left" data-checked={complete}>
                <input
                    type="checkbox"
                    checked={complete}
                    onChange={() => handleToggleTodo(id)}
                    className="checkbox"
                />
                <div>
                    <span style={{ fontWeight: 600 }}>{title}</span>
                    {description ? <span>({description})</span> : null}
                </div>
            </div>
            <div className="right">
                <div>
                    Created by {state.user || 'Default'} at {formatDateString(dateCreated)}
                </div>
                {dateCompleted ? (
                    <div>Completed at: {formatDateString(dateCompleted)}</div>
                ) : null}
            </div>
            <Button onClick={() => handleDeleteTodo(id)}>Delete</Button>
        </div>
    )
}
export default TodoItem
