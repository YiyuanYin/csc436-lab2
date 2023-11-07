import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { RequestProvider } from 'react-request-hook'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <RequestProvider value={axiosInstance}>
        <App />
    </RequestProvider>
)
