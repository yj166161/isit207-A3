import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './pages.css';

const SignUp = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = { username, email, password };
    localStorage.setItem('account', JSON.stringify(account));
    onSignup(username);
    const destination = location.state?.from;
    navigate(destination?.pathname || '/', {
      state: destination?.state,
      replace: true,
    });
  };

  return (
    <main className="account-page">
      <header className="account-heading">
        <h1>Create an account</h1>
        <p>Sign up to get started with PawPals.</p>
      </header>
      <div className="account-container">
        <section className="account-box">
          <h2 id="signup-title">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="account-field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="account-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="account-field">
              <label htmlFor="signup-password"> Create Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create account</button>
          </form>
          <p className="account-switch">
            Already have an account? <Link to="/login" state={location.state}>Log in</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUp;
