document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const errorBox = document.getElementById("login-error");

  errorBox.textContent = "";

  // Simple validation
  if (!email || !password) {
    errorBox.textContent = "Please enter email and password";
    return;
  }

  // Demo credentials
  const demoEmail = "organizer@college.edu";
  const demoPassword = "organizer";

  if (email === demoEmail && password === demoPassword) {
    // Store login state
    localStorage.setItem("user", JSON.stringify({
      email: email,
      role: "organizer"
    }));

    alert("Login Successful!");

    // Redirect to homepage or dashboard
    window.location.href = "index.html";
  } else {
    errorBox.textContent = "Invalid email or password";
  }
});