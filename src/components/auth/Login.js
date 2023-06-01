import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {getUserDashboardUrl} from "../../api/useApiCall";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8100/api/auth/authenticate', { email, password }, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            const { token, userId, username, userType, organizationId } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            localStorage.setItem('userType', userType);
            localStorage.setItem('organizationId', organizationId);

            navigate(getUserDashboardUrl());
        } catch (error) {
            setError("Incorrect email or password");
            console.log(error);
        }
    };

    return (<main className='login'>
            <div className="login-container">
                <div className="login-form">
                    <div className="login-register-container">
                        <div className="small-container">
                            <div className="login-m-container">
                                <h2 className='login-title'>Login</h2>
                            </div>
                            <Link to="/register" className='register-title'>Register</Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <div className="forgot-password">
                            <Link to="/forget-password" className='forgot-pass'>Forgot your password?</Link>
                        </div>
                        {error && <div>{error}</div>}
                        <div className="login-button-container">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    {/*<div className="google-button-container">*/}
                    {/*  <div className="google-icon-text-container">*/}
                    {/*    <div className="google-icon-container">*/}
                    {/*      <FcGoogle/>*/}
                    {/*    </div>*/}
                    {/*    <h3 className="google-text">Sign Up with Google</h3>*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        </main>

    );
}

export default Login;
