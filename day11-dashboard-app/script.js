document.addEventListener("DOMContentLoaded", function () {

  const app = document.getElementById("app");
  const currentUser = localStorage.getItem("currentUser");

  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  function getLoginHistory() {
    return JSON.parse(localStorage.getItem("loginHistory")) || [];
  }

  function saveLoginHistory(history) {
    localStorage.setItem("loginHistory", JSON.stringify(history));
  }

  function logLoginActivity(email) {
    const history = getLoginHistory();
    history.unshift({
      email,
      time: new Date().toLocaleString()
    });
    saveLoginHistory(history.slice(0, 10));
  }

  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
  }

  function renderUnauthorized() {
    app.innerHTML = `
      <div class="unauthorized">
        <h1>Access Restricted 🔒</h1>
        <p>You must login first to access the dashboard.</p>
        <button id="goLogin">Go to Login</button>
      </div>
    `;

    document.getElementById("goLogin").addEventListener("click", () => {
      window.location.href = "../day10-auth-system/index.html";



    });
  }

  function renderDashboard() {
    app.innerHTML = `
      <div class="dashboard">
        <div class="sidebar">
          <h2>Dashboard</h2>
          <button data-view="profile" class="nav-btn">Profile</button>
          <button data-view="analytics" class="nav-btn">Analytics</button>
          <button data-view="settings" class="nav-btn">Settings</button>
          <button id="themeToggle">Toggle Theme</button>
          <button id="logoutBtn">Logout</button>
        </div>
        <div class="content" id="contentArea"></div>
      </div>
    `;

    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderView(btn.dataset.view);
      });
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    });

    document.getElementById("themeToggle").addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", currentTheme);
      applyTheme(currentTheme);
    });

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    renderView("profile");
    document.querySelector('[data-view="profile"]').classList.add("active");

    logLoginActivity(currentUser);
  }

  function renderView(view) {
    const content = document.getElementById("contentArea");
    const users = getUsers();
    const history = getLoginHistory();

    if (view === "profile") {
      content.innerHTML = `
        <h1>Profile</h1>
        <div class="cards">
          <div class="card">
            <h3>Total Users</h3>
            <p>${users.length}</p>
          </div>
          <div class="card">
            <h3>Current User</h3>
            <p>${currentUser}</p>
          </div>
          <div class="card">
            <h3>Account Created</h3>
            <p>${history.find(h => h.email === currentUser)?.time || "Today"}</p>
          </div>
        </div>
      `;
    }

    if (view === "analytics") {
      content.innerHTML = `
        <h1>Recent Login Activity</h1>
        <div class="activity">
          ${history.map(item => `
            <div class="activity-item">
              <strong>${item.email}</strong>
              <span>${item.time}</span>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (view === "settings") {
      content.innerHTML = `
        <h1>Settings</h1>
        <p>Theme preference is saved locally.</p>
      `;
    }
  }

  if (!currentUser) {
    renderUnauthorized();
  } else {
    renderDashboard();
  }

});
