console.log("login linked1");

document.querySelector("#signup").addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    username: document.querySelector("#signupUsername").value,
    password: document.querySelector("#signupPassword").value,
  };
  console.log(userObj);
  fetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = "/dashboard";
    } else {
      alert("trumpet sound");
    }
  });
});
