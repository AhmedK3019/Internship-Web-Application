import React, { useState, useEffect } from "react";
import "./index.css";
import Register from "./Register";
import Company from "./Company";
import SCAD from "./SCAD";
import Student from "./Student";
import ProStudent from "./ProStudent";
import Faculty from "./Faculty";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showProStudent, setShowProStudent] = useState(false);
  const [showSCAD, setShowSCAD] = useState(false);
  const [showFaculty, setShowFaculty] = useState(false);
  const [user, setUser] = useState(null);
  const [companiesRequests, setCompaniesRequests] = useState(() => {
    const saved = localStorage.getItem("companiesRequests");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Test Company",
            email: "test@company.com",
            industry: "Software",
            size: "Medium",
            logo: null,
            files: [{ name: "document1.pdf" }],
          },
        ];
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
    localStorage.setItem(
      "companiesRequests",
      JSON.stringify(companiesRequests)
    );
  }, [companiesRequests]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "JohnDoe@gmail.com",
      password: "johndoe123",
      role: "Student",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "JaneSmith@gmail.com",
      password: "janesmith123",
      role: "Student",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "AliceJohnson@gmail.com",
      password: "alicejohnson123",
      role: "Pro Student",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "BobBrown@gmail.com",
      password: "bobbrown123",
      role: "Company",
      company: "Sumerge",
      industry: "IT",
      size: "Medium",
      logo: "sumerge.jpeg",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "CharlieDavis@gmail.com",
      password: "charliedavis123",
      role: "SCAD Office Member",
    },
    {
      id: 6,
      name: "David Wilson",
      email: "DavidWilson@gmail.com",
      password: "davidwilson123",
      role: "Faculty Member",
    },
  ]);

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

      setCompaniesRequests((prevRequests) => {
        const newRequests = [
          ...prevRequests,
          {
            id: prevRequests.length + 1,
            name: companyRequest.name,
            email: companyRequest.email,
            industry: companyRequest.industry,
            size: companyRequest.size,
            logo: logoDataURL,
            files: filesWithDataURLs,
          },
        ];
        return newRequests;
      });
    } catch (error) {
      console.error("Error converting files:", error);
    }
  }

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === "companiesRequests") {
        setCompaniesRequests(JSON.parse(e.newValue));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setEmail("");
      setPassword("");
      if (user.role === "Company") {
        setShowCompany(true);
      } else if (user.role === "Student") {
        setShowStudent(true);
      } else if (user.role === "Pro Student") {
        setShowProStudent(true);
      } else if (user.role === "SCAD Office Member") {
        setShowSCAD(true);
      } else if (user.role === "Faculty Member") {
        setShowFaculty(true);
      }
      setUser(user);
    } else {
      setMessage("Invalid email or password.");
    }
  }

  return (
    <>
      {showRegister ? (
        <Register onBack={goToLogin} onRegister={onRegister} />
      ) : showCompany ? (
        <Company user={user} />
      ) : showStudent ? (
        <Student user={user} />
      ) : showProStudent ? (
        <ProStudent user={user} />
      ) : showSCAD ? (
        <SCAD user={user} companiesRequests={companiesRequests} />
      ) : showFaculty ? (
        <Faculty user={user} />
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
