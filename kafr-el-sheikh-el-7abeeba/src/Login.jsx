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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [SCADNotifications, setSCADNotifications] = useState([]);
  const [PROStudentNotifications, setPROStudentNotifications] = useState([]);
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);

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
  const [companiesRequests, setCompaniesRequests] = useState([]);

  async function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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

      setCompaniesRequests((prevRequests) => [...prevRequests, newRequest]);

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

  function addUser(newUser) {
    const newUser = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: "Company",
      company: newUser.company,
      industry: newUser.industry,
      size: newUser.size,
      logo: newUser.logo,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCompaniesRequests((prevRequests) =>
      prevRequests.filter((request) => request.email !== newUser.email)
    );
  }

  function rejectCompanyRequest(request) {
    setCompaniesRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== request.id)
    );
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
        <ProStudent
          user={user}
          requestedAppointments={requestedAppointments}
          setRequestedAppointments={setRequestedAppointments}
          futureAppointments={futureAppointments}
          setFutureAppointments={setFutureAppointments}
          notifications={PROStudentNotifications}
          setSCADNotifications={setSCADNotifications}
          setNotifications={setPROStudentNotifications}
          onLogout={handleLogout}
        />
      ) : showSCAD ? (
        <SCAD
          user={user}
          companiesRequests={companiesRequests}
          addUser={addUser}
          rejectCompanyRequest={rejectCompanyRequest}
          requestedAppointments={requestedAppointments}
          futureAppointments={futureAppointments}
          addAppointment={setRequestedAppointments}
          setFutureAppointments={setFutureAppointments}
          notifications={SCADNotifications}
          setPRONotifications={setPROStudentNotifications}
          setNotifications={setSCADNotifications}
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
