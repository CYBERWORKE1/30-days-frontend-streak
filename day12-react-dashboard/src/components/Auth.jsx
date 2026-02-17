import { useState } from "react";

function Auth({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const getUsers = () =>
    JSON.parse(localStorage.getItem("users")) || [];

  const saveUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();

    if (mode === "signup") {
      if (users.find((u) => u.email === email)) {
        setError("Email already exists");
        return;
      }

      const newUser = {
        email,
        username,
        password,
        loginCount: 0,
        loginHistory: [],
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentUser(email);
    }

    if (mode === "login") {
      const user = users.find((u) => u.email === email);

      if (!user || user.password !== password) {
        setError("Invalid credentials");
        return;
      }

      user.loginCount += 1;
      user.loginHistory.push({
        time: new Date().toLocaleString(),
      });

      saveUsers(users);
      setCurrentUser(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 w-96">

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {mode === "login" ? "Welcome Back 👋" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            className="w-full p-3 rounded-xl bg-white/10 text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {mode === "signup" && (
            <input
              className="w-full p-3 rounded-xl bg-white/10 text-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            type="password"
            className="w-full p-3 rounded-xl bg-white/10 text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-xl text-white font-semibold">
            {mode === "login" ? "Login" : "Signup"}
          </button>
        </form>

        {error && (
          <p className="text-red-400 mt-4 text-sm text-center">
            {error}
          </p>
        )}

        <p className="text-gray-400 mt-8 text-sm text-center">
          {mode === "login" ? "No account?" : "Already registered?"}
          <button
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="ml-2 text-indigo-400 hover:underline"
          >
            Switch
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
