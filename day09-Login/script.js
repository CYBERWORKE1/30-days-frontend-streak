

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

const closeBtn = document.getElementById("closeModalBtn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const strengthBar = document.getElementById("strengthBar");
const submitBtn = document.getElementById("submitBtn");

const container = document.querySelector(".container");

let isEmailValid = false;
let isPasswordValid = false;
let currentUser = null;



function loadUserFromStorage() {
  const storedUser = localStorage.getItem("authUser");
  if (storedUser) {
    currentUser = storedUser;
  }
}

function saveUserToStorage(email) {
  localStorage.setItem("authUser", email);
  currentUser = email;
}

function logoutUser() {
  localStorage.removeItem("authUser");
  currentUser = null;
  renderLanding();
}



function renderLanding() {
  container.innerHTML = `
    <h1>Welcome to Frontend-Streak</h1>
    <button id="openModalBtn">Login</button>
  `;

  const newOpenBtn = document.getElementById("openModalBtn");
  newOpenBtn.addEventListener("click", openModal);
}


function renderDashboard() {
  container.innerHTML = `
    <h1>Welcome Back 👋</h1>
    <p>${currentUser}</p>
    <button id="logoutBtn">Logout</button>
  `;

  document
    .getElementById("logoutBtn")
    .addEventListener("click", logoutUser);
}



function openModal() {
  if (currentUser) return; // prevent modal if logged in
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});



function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Invalid email format";
    isEmailValid = false;
  } else {
    emailError.textContent = "";
    isEmailValid = true;
  }
}

function validatePassword() {
  const value = passwordInput.value;

  if (value.length < 6) {
    passwordError.textContent = "Minimum 6 characters";
    strengthBar.style.width = "30%";
    strengthBar.style.background = "red";
    isPasswordValid = false;
  } else if (value.length < 10) {
    passwordError.textContent = "";
    strengthBar.style.width = "70%";
    strengthBar.style.background = "orange";
    isPasswordValid = true;
  } else {
    passwordError.textContent = "";
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    isPasswordValid = true;
  }
}

function updateButtonState() {
  submitBtn.disabled = !(isEmailValid && isPasswordValid);
}

emailInput.addEventListener("input", () => {
  validateEmail();
  updateButtonState();
});

passwordInput.addEventListener("input", () => {
  validatePassword();
  updateButtonState();
});



document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (isEmailValid && isPasswordValid) {
    saveUserToStorage(emailInput.value);
    closeModal();
    renderDashboard();
  }
});


loadUserFromStorage();

if (currentUser) {
  renderDashboard();
} else {
  renderLanding();
}
