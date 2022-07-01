import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Register = () => {
    const [value, setValue] = useState({});
    const [message, setMessage] = useState({});
    const [error, setError] = useState([]);
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
            const response = await axios.post('http://localhost:5000/register', {
                username: value.username,
                email: value.email,
                password: value.password,
            });

            setMessage({
                status: response.status,
                message: response.data.message
            });

            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            setError(error.response.data.errors);
            setStatus(error.response.status);
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

            {error.length > 0 ? (
                <ul className="alertDanger">
                    <h5>Status: {status}</h5>
                    {error.map((err, index) => {
                        return <li key={index}>{err.msg}</li>
                    })}
                </ul>
            ) : ''}

            <div className="container mx-auto col-md-5 bg-secondary p-5 rounded shadow">
                <h1 className="text-center fs-2 fw-bold mb-4">Login to your account</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" onChange={changeHandler} placeholder="enter your name" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" onChange={changeHandler} placeholder="example@gmail.com" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={changeHandler} placeholder="enter your password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

                <p className="text-center mt-3">already have an account? <Link to="/" className="text-light fw-bold register_text">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;