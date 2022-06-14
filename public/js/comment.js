console.log("login linked1");

document.querySelector("#newComment").addEventListener("submit", (e) => {
  e.preventDefault();
  const commentObj = {
    description: document.querySelector("#commentbody").value.trim(),
    blog_id:
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ],
  };
  console.log(commentObj);

  fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(commentObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});
