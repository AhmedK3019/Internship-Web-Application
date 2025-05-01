import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Company from './Company';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

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

  return (
    <>
      {showRegister ? (
        <Register onBack={goToLogin} />
      ) : (showCompany ? (
        <Company email={email} />
      ) : (
        <Login onRegisterClick={goToRegister} onLoginClick={goToUserPage} />
      ))}
    </>
  );
}

export default App;
