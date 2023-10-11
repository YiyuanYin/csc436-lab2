import { Button } from 'react-bootstrap';

export default function Logout({ onLogOut }) {
    return (
      <Button onClick={onLogOut} variant="secondary">Log Out</Button>
    )
}