import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  function goToRegister() {
    setShowRegister(true);
  }

  function goToLogin() {
    setShowRegister(false);
  }

  return (
    <>
      {showRegister ? (
        <Register onBack={goToLogin} />
      ) : (
        <Login onRegisterClick={goToRegister} />
      )}
    </>
  );
}

export default App;
