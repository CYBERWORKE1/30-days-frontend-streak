let count = 0;

const countDisplay =document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn=document.getElementById("dec");
const resetbtn = document.getElementById("reset");

incBtn.addEventListener("click",() =>{
    count++;
    countDisplay.textContent = count;
});

decBtn.addEventListener("click",() =>{
    count--;
    countDisplay.textContent = count;
});

resetbtn.addEventListener("click",() =>{
    count = 0;
    countDisplay.textContent = count;
});

// LIVE TEXT
const input = document.getElementById("textInput");
const preview =document.getElementById("preview");

input.addEventListener("input",() => {
    preview.textContent = input.value;
});

const themeBtn =document.getElementById("themeBtn");
themeBtn.addEventListener("click",() =>{
    document.body.classList.toggle("dark");
});