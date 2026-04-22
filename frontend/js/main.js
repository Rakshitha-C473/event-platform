const API = "http://127.0.0.1:5000/api/events";

// Global events store
let events = [];

// -------------------- LOAD EVENTS --------------------
async function loadEvents() {
  try {
    const res = await fetch(`${API}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    events = data;
    renderEvents(events);

  } catch (err) {
    console.error("Load Events Error:", err);
    alert("Failed to load events");
  }
}

// -------------------- RENDER --------------------
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
        <p>${e.event_date || ""}</p>

        <button class="register-btn"
          onclick="registerEvent('${e.title}')">
          Register Now
        </button>
      </div>
    `;
  });
}

// -------------------- SEARCH --------------------
async function searchEvents() {
  try {
    const college = document.getElementById("college").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;

    const res = await fetch(
      `${API}/search?college=${college}&location=${location}&category=${category}`
    );

    const result = await res.json();

    const container = document.getElementById("eventsList");
    container.innerHTML = "";

    if (!result || result.length === 0) {
      container.innerHTML = `<div class="not-found">❌ No events found</div>`;
      return;
    }

    result.forEach(e => {
      container.innerHTML += `
        <div class="card">
          <span class="tag">${e.category}</span>
          <h3>${e.title}</h3>
          <p>${e.description}</p>
          <p><b>${e.college}</b></p>
          <p>${e.location}</p>
          <p>${e.event_date}</p>

          <button class="register-btn"
            onclick="registerEvent('${e.title}')">
            Register Now
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.error("Search Error:", err);
    alert("Search failed");
  }
}

// -------------------- ADD EVENT (frontend only test) --------------------
async function addEvent() {
  const newEvent = {
    title: document.getElementById("title").value,
    category: document.getElementById("eventCategory").value,
    event_date: document.getElementById("eventDate").value,
    college: document.getElementById("collegeName").value,
    location: document.getElementById("eventLocation").value,
    description: document.getElementById("description").value
  };

  try {
    const res = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    });

    const data = await res.json();
    alert(data.message);

    loadEvents(); // refresh from backend

  } catch (err) {
    console.error(err);
    alert("Failed to add event");
  }
}

// -------------------- REGISTER --------------------
async function registerEvent(eventName) {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/register", {
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
    console.error("Register Error:", err);
    alert("Registration failed");
  }
}

// -------------------- LOAD PAGE --------------------
window.onload = function () {
  loadEvents();
};