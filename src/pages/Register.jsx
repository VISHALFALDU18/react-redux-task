import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setMessage('Please fill in all fields');
            return;
        }

        localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: '#646cff' }}>Register</h2>
            <form onSubmit={handleRegister}>
                <div>

                    <input
                        type="text"
                        style={{ marginBottom: '20px', padding: '8px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        style={{ marginBottom: '20px', padding: '8px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>

            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <p style={{ color: 'black' }}>Already have an account? <Link to="/">Login here</Link></p>
        </div>
    )
}

export default Register;
