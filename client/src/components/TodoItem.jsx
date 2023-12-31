import React, { useContext } from 'react'
import { StateContext } from '../contexts';
import './TodoItem.css'
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useAPI } from '../hooks';

function formatDateString(dateStr) {
    if (!dateStr) {
        return ''
    }
    const date = new Date(Number(dateStr))
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

function TodoItem(props) {
    const { item } = props
    const { title, description, dateCreated, completed, dateCompleted, _id } = item
    const { dispatch } = useContext(StateContext);
    const [todoRes, toggleTodo] = useAPI(`/todo/${_id}`, 'put');
    const [deleteRes, deleteTodo] = useAPI(`/todo/${_id}`, 'delete');

    useEffect(() => {
        if (todoRes && todoRes.data) {
            dispatch({
                type: 'TOGGLE_TODO',
                id: _id,
                newTodo: {...todoRes.data, id: todoRes.data._id}
            })
        }
    }, [dispatch, _id, todoRes])

    useEffect(() => {
        if (deleteRes && deleteRes.data) {
            dispatch({
                type: 'DELETE_TODO',
                id: _id,
            })
        }
    }, [dispatch, _id, deleteRes])

    return (
        <div className="item-wrapper">
            <div className="left" data-checked={completed}>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTodo()}
                    className="checkbox"
                />
                <div>
                    <span style={{ fontWeight: 600 }}>{title}</span>
                    {description ? <span>({description})</span> : null}
                </div>
            </div>
            <div className="right">
                <div>
                    Created at {formatDateString(dateCreated)}
                </div>
                {dateCompleted ? (
                    <div>Completed at: {formatDateString(dateCompleted)}</div>
                ) : null}
            </div>
            <Button onClick={() => deleteTodo()}>Delete</Button>
        </div>
    )
}
export default TodoItem
