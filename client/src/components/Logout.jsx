import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { StateContext } from '../contexts';

export default function Logout() {
    const { dispatch } = useContext(StateContext);

    const handleLogOut = () => {
      dispatch({
        type: 'LOGOUT'
      })
      // dispatch({ type: 'CLEAR_TODO'})
    }

    return (
      <Button onClick={handleLogOut} variant="secondary">Log Out</Button>
    )
}