import { useEffect, useState } from "react";

function DynamoDB() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/dynamodb/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = async () => {
    const res = await fetch("http://localhost:5000/api/dynamodb/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setUsers((prev) => [...prev, data]);
    setName("");
  };

  return (
    <div>
      <h2>DynamoDB Users</h2>
      <div className="input-group">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((u, idx) => (
          <li key={idx}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DynamoDB;
