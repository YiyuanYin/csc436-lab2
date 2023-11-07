import React, { useCallback, useState, useContext } from 'react'
import { StateContext } from '../contexts';
import { useEffect } from 'react';
import { useResource } from 'react-request-hook';

export default function NewTodoForm({ handleClose }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const { dispatch } = useContext(StateContext);


    const [todo, createTodo] = useResource((newTodo) => ({
        url: "/todos",
        method: 'post',
        data: newTodo
    }))

    const onClickSubmit = useCallback(() => {
        const newTodo = { title, description, complete: false, dateCreated: new Date() }
        createTodo(newTodo)
        handleClose()
    }, [createTodo, description, handleClose, title])

    useEffect(() => {
        if (todo && todo.data) {
            dispatch({
                type: 'CREATE_TODO',
                newTodo: todo.data,
            })
        }
    }, [dispatch, todo])

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="title">title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    id="title"
                />
            </div>
            <div>
                <label htmlFor="description">description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    id="description"
                />
            </div>
            <input
                type="submit"
                value="Submit"
                disabled={!title}
                onClick={onClickSubmit}
            />
        </form>
    )
}
