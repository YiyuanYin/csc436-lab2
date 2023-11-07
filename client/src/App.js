import React, { useCallback, useReducer, useState } from 'react'
import './App.css'
import { Button, Modal } from 'react-bootstrap'
import Login from './components/Login'
import TodoItem from './components/TodoItem'
import Logout from './components/Logout'
import NewTodoForm from './components/NewTodoForm'
import { appReducer } from './reducer'
import { StateContext } from './contexts'
import { useResource } from 'react-request-hook'
import { useEffect } from 'react'

function App() {
    const [state, dispatch] = useReducer(appReducer, {
        todoList: [],
        user: '',
    })
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [todoResponse, getTodos] = useResource(() => ({
        url: '/todos',
        method: 'get',
    }))

    useEffect(() => {
        getTodos()
    }, [getTodos])

    useEffect(() => {
        if (todoResponse && todoResponse.data) {
            dispatch({ type: 'FETCH_TODO', todoList: todoResponse.data })
        }
    }, [todoResponse])

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            <Login />
            <div className="App">
                <h1>TodoList</h1>
                <div className="operations">
                    <Button onClick={handleShow}>Add New</Button>
                    <Logout />
                </div>
                <div className="todo-list">
                    {state.todoList.map((item) => (
                        <TodoItem item={item} key={item.id} />
                    ))}
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewTodoForm handleClose={handleClose} />
                    </Modal.Body>
                </Modal>
            </div>
        </StateContext.Provider>
    )
}

export default App
