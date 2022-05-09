console.log("hello");
document.querySelector("#newBlog").addEventListener("submit", (e) => {
  e.preventDefault();
  const blogObj = {
    title: document.querySelector("#title").value.trim(),
    body: document.querySelector("#body").value.trim(),
  };
  fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log();
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});
