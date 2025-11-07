export default function Sidebar({ halls, onSelectHall }) {
  return (
    <aside className="sidebar">
      <h3>Exam Halls</h3>
      <ul>
        {halls.map((hall) => (
          <li key={hall._id} onClick={() => onSelectHall(hall._id)}>
            <strong>{hall.name}</strong>
            <p>{hall.exam}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
