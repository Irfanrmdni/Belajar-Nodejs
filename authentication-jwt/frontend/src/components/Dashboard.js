import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory();

    async function refreshToken() {
        try {
            const getToken = await axios.get('http://localhost:5000/token');
            setToken(getToken.data.accessToken);
            const decode = jwtDecode(getToken.data.accessToken);
            setName(decode.username);
            setExpire(decode.exp);
        } catch (error) {
            if (error.response) {
                history.push('/login');
            }
        }
    }

    const axiosJwt = axios.create();

    axiosJwt.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setName(decode.username);
            setExpire(decode.exp);
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    async function getUsers() {

        const response = await axiosJwt.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data.data);
    }

    async function logoutHandler(e) {
        e.preventDefault();

        try {
            await axios.delete('http://localhost:5000/logout');
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        refreshToken();
        getUsers();
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="user">
                    <h1>Welcome back: <span>{name}</span></h1>
                </div>

                <ul className="nav">
                    <li><a className="nav-item" href="/">Home</a></li>
                    <li><a className="nav-item" href="/">About</a></li>
                    <li><a className="nav-item" href="/">Pricing</a></li>
                    <li><a className="nav-item" href="/">Contact</a></li>
                </ul>

                <button type="submit" onClick={logoutHandler} className="btn">Logout <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </button>
            </nav>

            <button onClick={getUsers} className="btn_logout">Get Users</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Dashboard;