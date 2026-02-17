function Sidebar({ setView, setCurrentUser }) {
  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">

      <h2 className="text-2xl font-bold mb-10">
        Dashboard
      </h2>

      <div className="space-y-4">

        <button
          onClick={() => setView("profile")}
          className="w-full text-left p-3 rounded-xl hover:bg-white/10"
        >
          Profile
        </button>

        <button
          onClick={() => setView("analytics")}
          className="w-full text-left p-3 rounded-xl hover:bg-white/10"
        >
          Activity
        </button>

        <button
          onClick={() => setView("settings")}
          className="w-full text-left p-3 rounded-xl hover:bg-white/10"
        >
          Settings
        </button>

        <button
          onClick={() => setCurrentUser(null)}
          className="w-full text-left p-3 rounded-xl bg-red-600 hover:bg-red-700 mt-6"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;
