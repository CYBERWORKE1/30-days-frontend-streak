document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeModalBtn");
  const container = document.querySelector(".container");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const submitBtn = document.getElementById("submitBtn");

  const form = document.getElementById("loginForm");
  const formTitle = document.getElementById("formTitle");
  const switchMode = document.getElementById("switchMode");

  let authMode = "login";
  let currentUser = null;

 

  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function setCurrentUser(email) {
    localStorage.setItem("currentUser", email);
    currentUser = email;
  }

  function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    renderLanding();
  }



  function renderLanding() {
    container.innerHTML = `
      <h1>Welcome to Frontend-Streak</h1>
      <button id="openModalBtn">Login / Signup</button>
    `;

    document
      .getElementById("openModalBtn")
      .addEventListener("click", openModal);
  }

  function renderDashboard() {
    container.innerHTML = `
      <h1>Welcome 👋</h1>
      <p>${currentUser}</p>
      <button id="logoutBtn">Logout</button>
    `;

    document
      .getElementById("logoutBtn")
      .addEventListener("click", logout);
  }

  
  function openModal() {
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);



  function updateMode() {
    if (authMode === "login") {
      formTitle.textContent = "Login";
      switchMode.textContent = "Signup";
    } else {
      formTitle.textContent = "Signup";
      switchMode.textContent = "Login";
    }
  }

  switchMode.addEventListener("click", () => {
    authMode = authMode === "login" ? "signup" : "login";
    updateMode();
  });

 

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }



  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const users = getUsers();

    if (!validateEmail(email)) {
      emailError.textContent = "Invalid email";
      return;
    }

    if (password.length < 6) {
      passwordError.textContent = "Password must be 6+ characters";
      return;
    }

    emailError.textContent = "";
    passwordError.textContent = "";

    if (authMode === "signup") {
      const userExists = users.find(u => u.email === email);

      if (userExists) {
        emailError.textContent = "Email already registered";
        return;
      }

      users.push({ email, password });
      saveUsers(users);
      setCurrentUser(email);
      closeModal();
      renderDashboard();
    }

    if (authMode === "login") {
      const user = users.find(u => u.email === email);

      if (!user) {
        emailError.textContent = "User not found";
        return;
      }

      if (user.password !== password) {
        passwordError.textContent = "Incorrect password";
        return;
      }

      setCurrentUser(email);
      closeModal();
      renderDashboard();
    }
  });

 

  currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    renderDashboard();
  } else {
    renderLanding();
  }

});
