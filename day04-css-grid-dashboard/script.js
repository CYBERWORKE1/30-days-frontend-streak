/* LIVE CLOCK */
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = hours % 12 || 12;
  minutes = minutes.toString().padStart(2, "0");

  document.getElementById("time").textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

/* GALLERY SLIDESHOW */
const images = [
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
];

let index = 0;
const gallery = document.getElementById("galleryImage");

setInterval(() => {
  index = (index + 1) % images.length;
  gallery.src = images[index];
}, 3000);
