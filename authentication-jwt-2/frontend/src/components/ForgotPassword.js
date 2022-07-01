import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState({});

    const changeHandler = (e) => {
        e.preventDefault();
        const email = e.target.value;
        setValue(email);
        setMessage({});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.put('http://localhost:5000/forgotPassword', {
            email: value
        });

        setMessage(response.data);
        setValue('');
    }

    return (
        <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
            {Object.values(message).length === 0 ? '' : (<div className="alert password">
                <h5>status: {message.status}</h5>
                <p>{message.message}</p>
            </div>)}

            <div className="container mx-auto col-md-5 bg-secondary p-5 rounded shadow">
                <h1 className="text-center fs-2 fw-bold mb-4">Send Your Email Account</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email or Username</label>
                        <input type="email" onChange={changeHandler} value={value} className="form-control" name="email" placeholder="example@gmail.com" />
                    </div>

                    <button type="submit" className="btn btn-success">Send Email</button>
                </form>

                <p className="text-center mt-3">Back to <Link to="/" className="text-light fw-bold register_text">login page</Link></p>
            </div>
        </div>
    );
};

export default ForgotPassword;