window.addEventListener("load", async () => {
  //   check if user is authenticated already
  const dbUser = await fetch("/api/users/session", {
    credentials: "include",
  });
  const session = await dbUser.json();

  if (session.status === "success") {
    window.location.href = "/categories";
  }
});

const handleSubmit = async (event) => {
  console.log(event.target);
  event.preventDefault();

  const formData = new FormData(event.target);
  const formEntries = Object.fromEntries(formData.entries());

  //   do some validation here
  await fetch("/api/users/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formEntries),
  }).then(async (res) => {
    const data = await res.json();
    if (data.status === "success") {
      window.location.href = "/categories";
    } else {
      const message = document.getElementById("message");
      message.classList.add("error");
      message.innerText = data.message;
    }
  });
};
