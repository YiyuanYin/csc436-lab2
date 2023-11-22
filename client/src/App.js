import React, { useReducer } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { appReducer } from './reducer'
import { StateContext } from './contexts'
import { BrowserRouter } from 'react-router-dom'
import { Todos } from './pages/Todos'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

function App() {
    const [state, dispatch] = useReducer(appReducer, {
        todoList: [],
        user: {},
    })
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact Component={Home} />
                    <Route path="/login" Component={Login} />
                    <Route path="/todos" Component={Todos} />
                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    )
}

export default App
