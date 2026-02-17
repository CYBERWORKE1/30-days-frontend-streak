function ActivityLog({ currentUser }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === currentUser);

  if (!user) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Login History
      </h2>

      <div className="space-y-4">
        {user.loginHistory.length === 0 && (
          <p className="text-gray-400">
            No login history yet.
          </p>
        )}

        {user.loginHistory.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 p-4 rounded-xl"
          >
            {item.time}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityLog;
