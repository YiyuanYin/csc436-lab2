import React, { useCallback, useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { StateContext } from '../contexts';
import './Login.css'

export default function Login() {
    const [hasAccount, setHasAccount] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const { dispatch } = useContext(StateContext);

    const onClickSubmit = useCallback(() => {
        if (email && password) {
            dispatch({ type: "LOGIN", email })
        }
    }, [dispatch, email, password])

    return (
        <div className="login-wrapper">
            <Form>
                <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                />
                <br />
                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {!hasAccount && (
                    <>
                        <Form.Label htmlFor="inputPassword5">
                            Repeat password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={rPassword}
                            onChange={(e) => setRPassword(e.target.value)}
                        />
                    </>
                )}
                {hasAccount && (
                    <div>
                        No account yet?
                        <span
                            className="click-text"
                            onClick={() => setHasAccount(false)}
                            variant="light"
                        >
                            {' '}
                            Click here{' '}
                        </span>
                        to register
                    </div>
                )}
                <Button
                    variant="primary"
                    disabled={
                        !password ||
                        !email ||
                        (!hasAccount && (!rPassword || rPassword !== password))
                    }
                    onClick={onClickSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
