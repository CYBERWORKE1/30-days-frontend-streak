import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return currentUser ? (
    <Dashboard
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  ) : (
    <Auth setCurrentUser={setCurrentUser} />
  );
}

export default App;
