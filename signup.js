document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Store in localStorage (temporary logic for demo)
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
  
    alert("Account created successfully!");
    window.location.href = "loginpage.html"; // Redirect to login
  });
  