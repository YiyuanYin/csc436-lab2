import React, { useCallback, useReducer, useState } from 'react'
import './App.css'
import { Button, Modal } from 'react-bootstrap'
import Login from './components/Login'
import TodoItem from './components/TodoItem'
import Logout from './components/Logout'
import NewTodoForm from './components/NewTodoForm'
import { appReducer } from './reducer'
import { StateContext } from './contexts'
import { initialToDoLists } from './constant'

function App() {
    const [state, dispatch] = useReducer(appReducer, {
        todoList: initialToDoLists,
        user: '',
    })
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleCreateTodo = (newTodo) => {
        dispatch({
            type: 'CREATE_TODO',
            newTodo,
        })
    }

    const onSubmit = useCallback((newData) => {
        handleClose()
        handleCreateTodo(newData)
    }, [])

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {state.user ? (
                <div className="App">
                    <h1>{state.user}'s Todolist</h1>
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
                            <NewTodoForm onSubmit={onSubmit} />
                        </Modal.Body>
                    </Modal>
                </div>
            ) : (
                <Login />
            )}
        </StateContext.Provider>
    )
}

export default App
