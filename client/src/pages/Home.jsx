import React, { useEffect, useContext } from 'react'
import { StateContext } from '../contexts'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate()
  useEffect(() => {
    if (!state.user.access_token) {
        navigate('/login')
    } else {
        navigate('/todos')
    }
  }, [navigate, state.user.access_token])

  return <div>Welcome</div>
}