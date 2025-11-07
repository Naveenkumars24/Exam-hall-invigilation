import { useNavigate } from "react-router-dom";
import { clearUserData, getUserData } from "../utils/auth";

export default function Header({ toggleSidebar }) {
  const { name, role } = getUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    navigate("/");
  };

  return (
    <header className="header">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <h1>Exam Hall Management</h1>
      <div className="user-info">
        <span>{name} ({role})</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
