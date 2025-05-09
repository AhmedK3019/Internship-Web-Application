import React, { useState, useEffect } from "react";
import "./index.css";
import Register from "./Register";
import Company from "./Company";
import SCAD from "./SCAD";
import Student from "./Student";
import ProStudent from "./ProStudent";
import Faculty from "./Faculty";
import companiesRequests from "./companiesRequests";
import users from "./users";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showCompany, setShowCompany] = useState(() => {
    return localStorage.getItem("view") === "company";
  });
  const [showStudent, setShowStudent] = useState(() => {
    return localStorage.getItem("view") === "student";
  });
  const [showProStudent, setShowProStudent] = useState(() => {
    return localStorage.getItem("view") === "proStudent";
  });
  const [showSCAD, setShowSCAD] = useState(() => {
    return localStorage.getItem("view") === "scad";
  });
  const [showFaculty, setShowFaculty] = useState(() => {
    return localStorage.getItem("view") === "faculty";
  });

  async function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      switch (user.role) {
        case "Company":
          localStorage.setItem("view", "company");
          break;
        case "Student":
          localStorage.setItem("view", "student");
          break;
        case "Pro Student":
          localStorage.setItem("view", "proStudent");
          break;
        case "SCAD Office Member":
          localStorage.setItem("view", "scad");
          break;
        case "Faculty Member":
          localStorage.setItem("view", "faculty");
          break;
        default:
          localStorage.removeItem("view");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("view");
    }
  }, [user]);

  function handleLogout() {
    setUser(null);
    setShowCompany(false);
    setShowStudent(false);
    setShowProStudent(false);
    setShowSCAD(false);
    setShowFaculty(false);
    localStorage.removeItem("user");
    localStorage.removeItem("view");
  }

  async function onRegister(companyRequest) {
    try {
      // Convert logo to data URL if it exists
      const logoDataURL = companyRequest.logo
        ? await fileToDataURL(companyRequest.logo)
        : null;

      // Convert all files to data URLs
      const filesWithDataURLs = await Promise.all(
        companyRequest.files.map(async (file) => ({
          name: file.name,
          dataURL: await fileToDataURL(file),
        }))
      );

      const currentRequests = companiesRequests || [];

      const newRequest = {
        id: currentRequests.length + 1,
        username: companyRequest.username,
        password: companyRequest.password,
        name: companyRequest.name,
        email: companyRequest.email,
        industry: companyRequest.industry,
        size: companyRequest.size,
        logo: logoDataURL,
        files: filesWithDataURLs,
      };

      companiesRequests.push(newRequest);

      return true;
    } catch (error) {
      console.error("Error converting files:", error);
      return false;
    }
  }

  function goToLogin(event) {
    setShowRegister(false);
  }

  function onRegisterClick(event) {
    setShowRegister(true);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setEmail("");
      setPassword("");
      setUser(foundUser);
      if (foundUser.role === "Company") {
        setShowCompany(true);
      } else if (foundUser.role === "Student") {
        setShowStudent(true);
      } else if (foundUser.role === "Pro Student") {
        setShowProStudent(true);
      } else if (foundUser.role === "SCAD Office Member") {
        setShowSCAD(true);
      } else if (foundUser.role === "Faculty Member") {
        setShowFaculty(true);
      }
    } else {
      setMessage("Invalid email or password.");
    }
  }

  return (
    <>
      {showRegister ? (
        <Register onBack={goToLogin} onRegister={onRegister} />
      ) : showCompany ? (
        <Company user={user} onLogout={handleLogout} />
      ) : showStudent ? (
        <Student user={user} onLogout={handleLogout} />
      ) : showProStudent ? (
        <ProStudent user={user} onLogout={handleLogout} />
      ) : showSCAD ? (
        <SCAD
          user={user}
          companiesRequests={companiesRequests}
          onLogout={handleLogout}
        />
      ) : showFaculty ? (
        <Faculty user={user} onLogout={handleLogout} />
      ) : (
        <div className="page">
          <title>Login</title>
          <div className="content">
            <div>
              <form onSubmit={handleSubmit}>
                <h1 className="logo">KSH</h1>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <h3>
                  Want to register your Company? Click{" "}
                  <span onClick={onRegisterClick} className="hyperText">
                    here
                  </span>
                  .
                </h3>
              </form>
              {message && <div className="error-message"> {message}</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
