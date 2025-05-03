import React, { useState } from 'react';
import './index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showProStudent, setShowProStudent] = useState(false);
  const [showSCAD, setShowSCAD] = useState(false);
  const [showFaculty, setShowFaculty] = useState(false);

  
  function goToRegister() {
    setShowRegister(true);
    setShowCompany(false);
  }
  
  function goToLogin() {
    setShowRegister(false);
    setShowCompany(false);
  }
  
  function goToUserPage({email,role}) {
    setEmail(email);
    setRole(role);
    switch(role){
      case "Company" : setShowCompany(true); break;
      default : break;
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleRoleChange(event) {
    setRole(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    setMessage(`Logged in successfully as ${role} !`);
    onLoginClick({email, role});
  }

  return (
    <>
      {showRegister ? (
        <Register onBack={goToLogin} />
      ) : (showCompany ? (
        <Company email={email} />
      ) : (showStudent ? (
        <Student email={email} />
      ) : (showProStudent ? (
        <ProStudent email={email} />
      ) : (showSCAD ? (
        <SCAD email={email} />
      ) : (showFaculty ? (
        <Faculty email={email} />
      ) : (
    <div className='page'>
      <title>Login</title>
      <div className="content">  
        <div>              
          <form onSubmit={handleSubmit}>
          <h1 className='logo' >KSH</h1>
          <h2>Login to your account</h2>
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={handlePasswordChange}
            />
            <select
              className="select"
              value={role}
              onChange={handleRoleChange}
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
            <h3>
              Want to register your Company? Click{' '}
              <span onClick={onRegisterClick} className='hyperText'>
              here
              </span>.
            </h3>
          </form>
          {message && <div className='message'> {message}</div>}
        </div>
      </div>
    </div>
      ))))))}
      </>
    );
};

export default Login;