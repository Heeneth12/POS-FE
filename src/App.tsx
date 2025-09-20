import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationContainer from "./components/Notification/NotificationContainer";

function App() {
  return (
    <Router>
      {/* Global Notification */}
      <NotificationContainer />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes here */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
