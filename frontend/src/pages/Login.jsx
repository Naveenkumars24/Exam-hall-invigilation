import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { saveUserData } from "../utils/auth";   
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { username, password });
      saveUserData(data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Exam Hall Management</h2>
        <p>Secure Admin Login</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn">Login</button>

          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}