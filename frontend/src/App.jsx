import DynamoDB from "./pages/DynamoDB";
import RDS from "./pages/RDS";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AWS Multi-DB Explorer</h1>
      </header>
      <div className="section">
        <DynamoDB />
      </div>
      <div className="section">
        <RDS />
      </div>
    </div>
  );
}

export default App;
