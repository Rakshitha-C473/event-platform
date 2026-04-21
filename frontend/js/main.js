const API = "http://127.0.0.1:5000/api";

// Load events
async function loadEvents() {
  showLoading();

  try {
    const res = await fetch(`${API}/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interest: "tech" })
    });

    const data = await res.json();
    renderEvents(data);
  } catch (err) {
    showError("Failed to load events");
  }
}

async function registerEvent(eventName) {
  showLoading();

  try {
    const res = await fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "User",
        event: eventName
      })
    });

    const data = await res.json();

    alert(data.message);
  } catch (err) {
    showError("Registration failed");
  }
}

function renderEvents(data) {
  const container = document.getElementById("eventsList");

  container.innerHTML = "";

  data.forEach(e => {
    container.innerHTML += `
      <div class="card">
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
window.onload = function () {
  loadEvents();
};