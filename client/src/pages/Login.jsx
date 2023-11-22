import React, { useCallback, useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { StateContext } from '../contexts';
import { useResource } from "react-request-hook";
import { useNavigate } from 'react-router-dom';
import './Login.css'

export const Login = () => {
    const [hasAccount, setHasAccount] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const [loginFailedMsg, setLoginFailedMsg] = useState('')
    const { dispatch: dispatchUser } = useContext(StateContext);
    const navigate = useNavigate()

    const [loginUser, login] = useResource((dataUsername, dataPassword) => ({
        url: "/auth/login",
        method: "post",
        data: { username: dataUsername, password: dataPassword },
      }));

    const [registerUser, register] = useResource((dataUsername, dataPassword) => ({
        url: "/auth/register",
        method: "post",
        data: { username: dataUsername, password: dataPassword },
      }));

    const onClickSubmit = useCallback(() => {
        if (hasAccount) {
            login(username, password)
        } else {
            register(username, password)
        }
    }, [username, hasAccount, login, password, register])

    useEffect(() => {
        if (loginUser && loginUser.data) {
            dispatchUser({ type: "LOGIN", username: loginUser.data.username, access_token: loginUser.data.access_token });
            setLoginFailedMsg('')
            navigate('/todos')
        } else if (loginUser.error) {
            setLoginFailedMsg(loginUser.error.data.error)
        }
      }, [loginUser, dispatchUser, navigate]);

    useEffect(() => {
        if (registerUser && registerUser.data) {
            dispatchUser({ type: "REGISTER", username: registerUser.data.username, access_token: registerUser.data.access_token });
            navigate('/todos')
        } else if (registerUser.error) {
            setLoginFailedMsg(registerUser.error.data.error)
        }
    }, [registerUser, dispatchUser, navigate]);

    return (
        <div className="login-wrapper">
            <Form>
                <Form.Label htmlFor="inputPassword5">Username</Form.Label>
                <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
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
                        !username ||
                        (!hasAccount && (!rPassword || rPassword !== password))
                    }
                    onClick={onClickSubmit}
                    style={{ marginTop: 20 }}
                >
                    Submit
                </Button>
                {loginFailedMsg !== '' ?  <div style={{ color: 'red'}}>{loginFailedMsg}</div> : null}
            </Form>
        </div>
    )
}
