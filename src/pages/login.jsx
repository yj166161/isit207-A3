import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './pages.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = JSON.parse(localStorage.getItem('account'));

    if (account && account.username === username && account.password === password) {
      onLogin(username);
      const destination = location.state?.from;
      navigate(destination?.pathname || '/', {
        state: destination?.state,
        replace: true,
      });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <main className="account-page">
      <header className="account-heading">
        <h1>Welcome back</h1>
        <p>Log in to your PetHeaven account.</p>
      </header>
      <div className="account-container">
        <section className="account-box">
          <h2 id="login-title">Log in</h2>
          <form onSubmit={handleSubmit}>
            <div className="account-field">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="account-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="account-switch">
            New here? <Link to="/signup" state={location.state}>Click to sign up</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
