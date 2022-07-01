import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState({
        password: '',
        confirmpassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const { token } = useParams();

    const changeHandler = (e) => {
        e.preventDefault();

        const name = e.target.getAttribute('name');
        setPassword({
            ...password,
            [name]: e.target.value
        });

        setMessage('');
        setError('');
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password.password === '' || password.confirmpassword === '') return setMessage('password tidak boleh kosong!');
        if (password.password !== password.confirmpassword) return setMessage('password tidak sama!');
        const response = await axios.put('http://localhost:5000/resetpassword', {
            password: password.password,
            token: token,
        });
        setError(response.data.errors);
        setMessage(response.data.message);

    }

    return (
        <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
            {message && (
                <div className="alertDanger">
                    <p>{message}</p>
                </div>
            )}
            {error && (
                <div className="alertDanger">
                    <h5>Error</h5>
                    <p>{error.msg}</p>
                </div>
            )}
            <div className="container mx-auto col-md-5 bg-secondary p-5 rounded shadow">
                <h1 className="text-center fs-2 fw-bold mb-4">Reset Password Your Account</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type="password" className="form-control" name="password" onChange={changeHandler} value={password.password} placeholder="enter your new password" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmpassword" onChange={changeHandler} value={password.confirmpassword} placeholder="confirm your password" />
                    </div>

                    <button type="submit" className="btn btn-success">Change</button>
                </form>

                <p className="text-center mt-3">Back to <Link to="/" className="text-light fw-bold register_text">login page</Link></p>
            </div>
        </div>
    );
};

export default ResetPassword;