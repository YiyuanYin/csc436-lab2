import React, { useContext } from 'react'
import { StateContext } from '../contexts';
import './TodoItem.css'
import { Button } from 'react-bootstrap';
import { useResource } from 'react-request-hook';
import { useEffect } from 'react';

function formatDateString(dateStr) {
    if (!dateStr) {
        return ''
    }
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

function TodoItem(props) {
    const { item } = props
    const { title, description, dateCreated, complete, dateCompleted, id } = item
    const { state, dispatch } = useContext(StateContext);
    const [todoRes, toggleTodo] = useResource( ()=> ({
        url: `/todos/${item.id}`,
        method: 'put',
        data: {...item, complete: !item.complete, dateCompleted: item.complete ? null : new Date() }
      }));


    useEffect(() => {
        if (todoRes && todoRes.data) {
            dispatch({
                type: 'TOGGLE_TODO',
                id,
                newTodo: todoRes.data
            })
        }
    }, [dispatch, id, todoRes])

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
                    onChange={toggleTodo}
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
