window.addEventListener("load", () => {
  setTimeout(
    () => (document.getElementById("loading").style.display = "none"),
    1000
  );
});

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formEntries = Object.fromEntries(formData.entries());

  //   do some validation here
  fetch("/api/users/signup", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formEntries),
  }).then(async (res) => {
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      const message = document.getElementById("message");
      message.classList.add("success");
      message.innerText = "Account created successfully!";

      setTimeout(() => {
        window.location.href = "/categories";
      }, 2000);
    } else {
      const message = document.getElementById("message");
      message.classList.add("error");
      message.innerText = data.message;
    }
  });
};
