import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [value, setValue] = useState({});
    const [message, setMessage] = useState({});
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    let navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            return navigate('/dashboard');
        }
    }, [token, navigate]);

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: value.email,
                password: value.password
            });

            setMessage({
                status: response.data.status,
                message: response.data.message,
            });

            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token)
            }

            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);

        } catch (error) {
            setError(error.response.data.errors.msg);
            setStatus(error.response.status)
        }
    }

    function changeHandler(e) {
        e.preventDefault();

        const name = e.target.getAttribute('name');
        setValue({
            ...value,
            [name]: e.target.value
        });
    }

    return (
        <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
            {Object.values(message).length === 0 ? '' : (<div className="alert">
                <h5>status: {message.status}</h5>
                <p>{message.message}</p>
            </div>)}

            {error === '' ? '' : (<div className="alertDanger">
                <h5>status: {status}</h5>
                <p>{error}</p>
            </div>)}

            <div className="container mx-auto col-md-5 bg-secondary p-5 rounded shadow">
                <h1 className="text-center fs-2 fw-bold mb-4">Login to your account</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email or Username</label>
                        <input type="email" className="form-control" name="email" onChange={changeHandler} placeholder="example@gmail.com" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={changeHandler} placeholder="enter your password" />
                    </div>

                    <div>
                        <p><Link to="/forgotpassword" className="text-light fw-bold register_text">Lupa password?</Link></p>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <p className="text-center mt-3">Don't have a user account yet? <Link to="/register" className="text-light fw-bold register_text">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;