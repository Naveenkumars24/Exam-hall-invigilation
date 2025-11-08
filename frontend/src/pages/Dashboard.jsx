import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import StudentTable from "../components/StudentTable";
import "../styles/dashboard.css";


export default function Dashboard() {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [students, setStudents] = useState([]);

  // Fetch halls
  useEffect(() => {
    API.get("/halls").then((res) => setHalls(res.data));
  }, []);

  // Fetch students for a hall
  const loadHall = async (hallId) => {
    const { data } = await API.get(`/students/hall/${hallId}`);
    const hall = halls.find((h) => h._id === hallId);
    setSelectedHall(hall);
    setStudents(data);
  };

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-body">
        <Sidebar halls={halls} onSelectHall={loadHall} />
        <main>
          {selectedHall ? (
            <>
              <h2>
                VENUE : {selectedHall.name}
              </h2>
              <h3>INVIGILATOR : {selectedHall.invigilator}</h3>
              <span style={{ fontSize: "18px", color: "#b58051" }}></span>
              <div className="stats-container">
                <StatsCard label="Total Students" value={students.length} />
                <StatsCard
                  label="Present"
                  value={students.filter((s) => s.status === "present").length}
                />
                <StatsCard
                  label="Authenticated"
                  value={students.filter((s) => s.authenticated).length}
                />
                <StatsCard
                  label="Malpractice"
                  value={students.filter((s) => s.malpractice).length}
                />
              </div>
              <StudentTable
                students={students}
                setStudents={setStudents}
                hallId={selectedHall._id}
              />
            </>
          ) : (
            <p>Select an exam hall to view details</p>
          )}
        </main>
      </div>
    </div>
  );
}
