import { useState } from "react";
import App from "./App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Login Successful");
      setLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  if (loggedIn) {
    return <App />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #141e30, #243b55)",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "380px",
          backgroundColor: "#1f2937",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#00ffd5",
            marginBottom: "30px",
            fontSize: "42px",
            lineHeight: "50px",
            fontWeight: "bold",
          }}
        >
          Welcome Back 🔐
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#00ffd5",
            color: "black",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
            marginTop: "10px",
          }}
        >
          Login
        </button>

        <p
          style={{
            color: "#d1d5db",
            marginTop: "25px",
            fontSize: "15px",
          }}
        >
          Admin Login Page
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "16px",
  backgroundColor: "#374151",
  color: "white",
};

export default Login;