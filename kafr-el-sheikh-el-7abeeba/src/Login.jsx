import React, { useState } from 'react';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    setMessage(`Logged in successfully as ${role}!`);
  };

  return (
    <div className='page'>
        <div className="login-container">        
            <title/>Login
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="login-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Company">Company</option>
            <option value="Student">Student</option>
            <option value="Pro Student">Pro Student</option>
            <option value="SCAD Office Member">SCAD Office Member</option>
            <option value="Faculty Member">Faculty Member</option>
          </select>
          <button type="submit">
            Login
          </button>
        </form>
        {message && <div className='message'> {message}</div>}
      </div>
    </div>
  );
};

export default Login;
