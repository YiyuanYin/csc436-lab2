import React, { useCallback, useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { StateContext } from '../contexts';
import { useResource } from "react-request-hook";
import './Login.css'

export default function Login() {
    const [hasAccount, setHasAccount] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const [loginFailedMsg, setLoginFailedMsg] = useState('')
    const { dispatch: dispatchUser } = useContext(StateContext);

    const [loginUser, login] = useResource((dataEmail, dataPassword) => ({
        url: "/login",
        method: "post",
        data: { email: dataEmail, password: dataPassword },
      }));

    const [registerUser, register] = useResource((dataEmail, dataPassword) => ({
        url: "/users",
        method: "post",
        data: { email: dataEmail, password: dataPassword },
      }));

    const onClickSubmit = useCallback(() => {
        if (hasAccount) {
            login(email, password)
        } else {
            register(email, password)
        }
    }, [email, hasAccount, login, password, register])

    useEffect(() => {
        if (loginUser) {
            if (loginUser.error) {
                setLoginFailedMsg(loginUser.error.data)
            } else if (loginUser.data?.user) {
                dispatchUser({ type: "LOGIN", email: loginUser.data.user.email });
                setLoginFailedMsg('')
            }
        }
      }, [loginUser, dispatchUser]);

    useEffect(() => {
        if (registerUser && registerUser.data) {
            dispatchUser({ type: "REGISTER", email: registerUser.data.user.email });
        } else if (registerUser.error) {
            setLoginFailedMsg(registerUser.error.data)
        }
    }, [registerUser, dispatchUser]);

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
                <Form.Label htmlFor="inputPassword5">Password(At least 4 letters)</Form.Label>
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
                {loginFailedMsg !== '' ?  <div style={{ color: 'red'}}>{loginFailedMsg}</div> : null}
            </Form>
        </div>
    )
}
