import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [value, getValue] = useState({});
    const [errorMsg, setErrorMsg] = useState({
        message: '',
        status: ''
    });

    const history = useHistory();

    async function submitHandler(e) {
        e.preventDefault();
        const getApi = 'http://localhost:5000/login';

        try {
            await axios.post(getApi, {
                email: value.email,
                password: value.password,
            });
            history.push('/');
            alert('Login successfully');
        } catch (error) {
            if (error.response) {
                setErrorMsg({
                    message: error.response.data.message,
                    status: error.response.data.status,
                });
            }
        }
    }

    function changeHandler(e) {
        e.preventDefault();
        const name = e.target.getAttribute('name');

        getValue({
            ...value,
            [name]: e.target.value,
        });
    }

    return (
        <div className="main">
            {errorMsg.status === '' && errorMsg.message === '' ? '' : (
                <div className="msg">
                    <p>status: {errorMsg.status}</p>
                    <h1>{errorMsg.message}</h1>
                </div>
            )}

            <div className="header">
                <h1>Login to your account</h1>

                <form className="form" onSubmit={submitHandler}>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="example@gmail.com" onChange={changeHandler} required autoComplete="off" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={changeHandler} required autoComplete="off" />
                    </div>

                    <button type="submit" className="btn">Login</button>

                </form>
                <p>Belum memiliki akun ? <a href="/register">Daftar</a></p>
            </div>
        </div>
    );
};

export default Login;