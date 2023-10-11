import React, { useCallback, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css'

export default function Login(props) {
  const { onSubmit } = props;
  const [hasAccount, setHasAccount] = useState(true);
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRPassword] = useState('')

  const onClickSubmit = useCallback(() => {
    if (name && password) {
      onSubmit(name)
    }
  }, [name, password])

  return (
    <div className='login-wrapper'>
      <Form>
        <Form.Label htmlFor="inputPassword5">Username</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
        /><br />
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        {!hasAccount && (
          <>
            <Form.Label htmlFor="inputPassword5">Repeat password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={rPassword}
              onChange={(e) => setRPassword(e.target.value)}
            />
          </>
        )}
        {hasAccount && <div>
          No account yet?
          <span className='click-text' onClick={() => setHasAccount(false)} variant="light"> Click here </span>
           to register
        </div>}
        <Button variant="primary" disabled={!password || !name || (!hasAccount && (!rPassword || (rPassword !== password)) )} onClick={onClickSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
