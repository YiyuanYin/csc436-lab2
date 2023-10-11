import React, { useCallback, useState } from 'react'
import './App.css'
import { Button, Modal } from 'react-bootstrap'
import Login from './components/Login'
import TodoItem from './components/TodoItem'
import Logout from './components/Logout'
import NewTodoForm from './components/NewTodoForm'

const initialToDoLists = [
    {
        title: 'buy a bottle of milk',
        description: 'organic',
        author: 'Default',
        dateCreated: new Date('2020-05-12T23:50:21.817Z'),
        complete: true,
        dateCompleted: new Date('2020-05-14T13:50:21.817Z'),
    },
    {
        title: 'close the door',
        description: '',
        author: 'Default',
        dateCreated: new Date('2023-10-09T13:50:21.817Z'),
        complete: true,
        dateCompleted: new Date('2023-10-10T21:50:21.817Z'),
    },
    {
        title: 'submit homework',
        description: 'csc436',
        author: 'Default',
        dateCreated: new Date('2023-10-08T13:50:21.817Z'),
        complete: false,
        dateCompleted: '',
    },
]

function App() {
    const [authed, setAuthed] = useState(false)
    const [name, setName] = useState('')
    const [todoList, setTodoList] = useState(initialToDoLists)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const onLogin = useCallback((userName) => {
        setAuthed(true)
        setName(userName)
    }, [])

    const onLogOut = useCallback(() => {
        setAuthed(false)
        setName('')
        setTodoList([])
    }, [])

    const onChangeComplete = useCallback(
        ({ title, complete, dateCompleted }) => {
            const index = todoList.findIndex((td) => td.title === title)
            const newList = [...todoList]
            newList[index] = { ...newList[index], complete, dateCompleted }
            setTodoList(newList)
        },
        [todoList]
    )

    const onSubmit = useCallback(
        (newData) => {
            handleClose()
            setTodoList([...todoList, { ...newData, author: name }])
        },
        [todoList, name]
    )

    if (!authed) {
        return <Login onSubmit={onLogin} />
    }

    return (
        <div className="App">
            <h1>{name}'s Todolist</h1>
            <div className="operations">
                <Button onClick={handleShow}>add new Todo</Button>
                <Logout onLogOut={onLogOut} />
            </div>
            <div className="todo-list">
                {todoList.map((item) => (
                    <TodoItem
                        item={item}
                        key={item.title}
                        onChangeComplete={onChangeComplete}
                    />
                ))}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewTodoForm onSubmit={(data) => onSubmit(data)} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default App
