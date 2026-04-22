let events = [
  {
    title: "Hackathon 2024",
    category: "Tech",
    date: "2024-10-15",
    college: "Tech Institute",
    location: "Main Campus",
    description: "A 24-hour coding challenge"
  },
  {
    title: "AI Workshop",
    category: "Tech",
    date: "2024-10-20",
    college: "Tech Institute",
    location: "Online",
    description: "Introduction to Generative AI"
  },
  {
    title: "Cultural Fest",
    category: "Cultural",
    date: "2024-11-20",
    college: "Arts College",
    location: "Amphitheatre",
    description: "Music, dance and drama"
  }
];

window.onload = () => {
  renderEvents(events);
  renderRecommended();
};

function renderEvents(data) {
  const container = document.getElementById("eventsList");
  container.innerHTML = "";

  data.forEach(e => {
    container.innerHTML += `
      <div class="card">
        <span class="tag">${e.category}</span>
        <h3>${e.title}</h3>
        <p>${e.description}</p>
        <p><b>${e.college}</b></p>
        <p>${e.location}</p>
        <p>${e.date}</p>
        <button class="register-btn" onclick="register('${e.title}')">
          Register Now
        </button>
      </div>
    `;
  });
}

function renderRecommended() {
  const container = document.getElementById("recommended");
  container.innerHTML = "";

  events.slice(0, 2).forEach(e => {
    container.innerHTML += `
      <div class="card">
        <span class="tag">${e.category}</span>
        <h3>${e.title}</h3>
        <p>${e.description}</p>
        <button class="register-btn" onclick="register('${e.title}')">
          Register Now
        </button>
      </div>
    `;
  });
}

function searchEvents() {
  const college = document.getElementById("college").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const category = document.getElementById("category").value;

  const filtered = events.filter(e =>
    (!college || e.college.toLowerCase().includes(college)) &&
    (!location || e.location.toLowerCase().includes(location)) &&
    (!category || e.category === category)
  );

  renderEvents(filtered);
}

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
}

function register(eventName) {
  alert("Registered for " + eventName);
}