import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [value, setValue] = useState({});
    const [errorMsg, setErrorMsg] = useState({
        message: '',
        status: ''
    });

    const history = useHistory();

    async function submitHandler(e) {
        e.preventDefault();
        const getApi = 'http://localhost:5000/register';

        try {
            await axios.post(getApi, {
                username: value.username,
                email: value.email,
                password: value.password,
                confirmPassword: value.confirmPassword,
            });
            history.push('/login');
            alert('Register successfully');
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

        setValue({
            ...value,
            [name]: e.target.value,
        });
    }

    return (
        <div className="main register">

            {errorMsg.status === '' && errorMsg.message === '' ? '' : (
                <div className="msg">
                    <p>status: {errorMsg.status}</p>
                    <h1>{errorMsg.message}</h1>
                </div>
            )}

            <div className="header">
                <h1>Register your account</h1>

                <form className="form" onSubmit={submitHandler}>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="your account name" onChange={changeHandler} required autoComplete="off" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="example@gmail.com" onChange={changeHandler} required autoComplete="off" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={changeHandler} required autoComplete="off" />
                    </div>
                    <div className="field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={changeHandler} required autoComplete="off" />
                    </div>

                    <button type="submit" className="btn">Register</button>

                </form>

                <p>Sudah memiliki akun ? <a href="/login">Login</a></p>
            </div>
        </div >
    );
};

export default Register;