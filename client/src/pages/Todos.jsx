import React, { useState, useContext, useEffect } from 'react'
import './Todos.css'
import { Button, Modal } from 'react-bootstrap'
import TodoItem from '../components/TodoItem'
import Logout from '../components/Logout'
import NewTodoForm from '../components/NewTodoForm'
import { StateContext } from '../contexts'
import { useNavigate } from 'react-router-dom'
import { useAPI } from '../hooks';

export const Todos = () => {
  const [show, setShow] = useState(false)
  const { state, dispatch } = useContext(StateContext);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()

  const [todoResponse, getTodos] = useAPI("/todo", "get")

  useEffect(() => {
      if (!state.user.access_token) {
          navigate('/login')
      } else {
          getTodos()
      }
  }, [getTodos, navigate, state.user.access_token])

  useEffect(() => {
      if (todoResponse && todoResponse.data) {
          dispatch({ type: 'FETCH_TODO', todoList: todoResponse.data })
      }
  }, [dispatch, todoResponse])

  return (
    <div className="App">
        <h1  style={{ color: 'cornflowerblue' }}>
          <span>
              {state.user.username}
          </span>
          's TodoList
        </h1>
        <div className="operations">
            <Button onClick={handleShow}>Add New</Button>
            <Logout />
        </div>
        <div className="todo-list">
            {state.todoList.map((item) => (
                <TodoItem item={item} key={item._id || item.id} />
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
  )
}