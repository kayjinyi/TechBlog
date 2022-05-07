console.log("login linked1");
const loginFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (name && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); //replace location or console.log("logedin")
    } else {
      alert("Failed to log in.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
