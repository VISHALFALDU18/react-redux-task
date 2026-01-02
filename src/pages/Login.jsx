import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const localUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (localUser && localUser.username === username && localUser.password === password) {
            alert('Logged in locally!');
            navigate('/products');
            return;
        }

        const result = await dispatch(loginUser({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/products');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: '#646cff' }}>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={loading}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
