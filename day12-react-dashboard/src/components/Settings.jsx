import { useState } from "react";

function Settings({ currentUser }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === currentUser);

  const [newUsername, setNewUsername] = useState(
    user?.username || ""
  );
  const [newPassword, setNewPassword] = useState("");

  const saveChanges = () => {
    user.username = newUsername;

    if (newPassword) {
      user.password = newPassword;
    }

    localStorage.setItem("users", JSON.stringify(users));
    alert("Profile Updated Successfully");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Account Settings
      </h2>

      <div className="space-y-4 max-w-md">

        <input
          className="w-full p-3 rounded-xl bg-white/10 text-white"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded-xl bg-white/10 text-white"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={saveChanges}
          className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-xl"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Settings;
