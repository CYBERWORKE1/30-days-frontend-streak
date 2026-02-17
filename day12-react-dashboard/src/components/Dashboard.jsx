import { useState } from "react";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import ActivityLog from "./ActivityLog";
import Settings from "./Settings";

function Dashboard({ currentUser, setCurrentUser }) {
  const [view, setView] = useState("profile");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      <Sidebar
        setView={setView}
        setCurrentUser={setCurrentUser}
      />

      <div className="flex-1 p-10">
        {view === "profile" && (
          <StatsCards
            users={users}
            currentUser={currentUser}
          />
        )}

        {view === "analytics" && (
          <ActivityLog
            users={users}
            currentUser={currentUser}
          />
        )}

        {view === "settings" && (
          <Settings
            users={users}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
