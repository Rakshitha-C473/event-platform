const API = "http://127.0.0.1:5000/api";

// Global events store (IMPORTANT)
let events = [];

// -------------------- LOAD EVENTS FROM BACKEND --------------------
async function loadEvents() {
  try {
    const res = await fetch(`${API}/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interest: "tech" })
    });

    const data = await res.json();

    // sync global events for search
    events = data;

    renderEvents(events);
  } catch (err) {
    console.error(err);
    alert("Failed to load events");
  }
}

// -------------------- RENDER EVENTS --------------------
function renderEvents(data) {
  const container = document.getElementById("eventsList");
  container.innerHTML = "";

  data.forEach(e => {
    container.innerHTML += `
      <div class="card">
        <span class="tag">${e.category || ""}</span>
        <h3>${e.title}</h3>
        <p>${e.description || ""}</p>
        <p><b>${e.college || ""}</b></p>
        <p>${e.location || ""}</p>
        <p>${e.date || ""}</p>

        <button class="register-btn"
          onclick="registerEvent('${e.title}')">
          Register Now
        </button>
      </div>
    `;
  });
}

// -------------------- SEARCH FUNCTION --------------------
function searchEvents() {
  console.log("Search button clicked"); // 🔍 debug

  const collegeInput = document.getElementById("searchKeyword");
  const locationInput = document.getElementById("searchLocation");
  const categoryInput = document.getElementById("searchCategory");

  if (!collegeInput || !locationInput || !categoryInput) {
    console.error("Input fields not found");
    return;
  }

  const college = collegeInput.value.toLowerCase();
  const location = locationInput.value.toLowerCase();
  const category = categoryInput.value;

  const filtered = events.filter(e =>
    (!college || (e.college || "").toLowerCase().includes(college)) &&
    (!location || (e.location || "").toLowerCase().includes(location)) &&
    (!category || e.category === category)
  );

  renderEvents(filtered);
  alert("Event Created Successfully!");
}

// -------------------- ADD EVENT --------------------
function addEvent() {
  const newEvent = {
    title: document.getElementById("title").value,
    category: document.getElementById("eventCategory").value,
    date: document.getElementById("eventDate").value,
    college: document.getElementById("collegeName").value,
    location: document.getElementById("eventLocation").value,
    description: document.getElementById("description").value
  };

  events.push(newEvent);
  renderEvents(events);

  alert("Event Created Successfully!");
}

// -------------------- REGISTER EVENT --------------------
async function registerEvent(eventName) {
  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "User",
        event: eventName
      })
    });

    const data = await res.json();
    alert(data.message || "Registered successfully!");
  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
}

// -------------------- RECOMMENDED EVENTS --------------------
function renderRecommended() {
  const container = document.getElementById("recommended");
  container.innerHTML = "";

  events.slice(0, 2).forEach(e => {
    container.innerHTML += `
      <div class="card">
        <span class="tag">${e.category || ""}</span>
        <h3>${e.title}</h3>
        <p>${e.description || ""}</p>

        <button class="register-btn"
          onclick="registerEvent('${e.title}')">
          Register Now
        </button>
      </div>
    `;
  });
}

// -------------------- PAGE LOAD --------------------
window.onload = function () {
  loadEvents();
};