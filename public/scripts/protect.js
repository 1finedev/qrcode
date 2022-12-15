(async () => {
  //   check if user is authenticated already
  const dbUser = await fetch("/api/users/session", {
    credentials: "include",
  });
  const session = await dbUser.json();

  if (session.status === "success") {
    if (window.location.pathname === "/login") {
      window.location.href = "/categories";
    } else {
      setTimeout(
        () => (document.getElementById("loading").style.display = "none"),
        1000
      );
    }
  } else {
    if (window.location.pathname === "/login") {
      setTimeout(
        () => (document.getElementById("loading").style.display = "none"),
        1000
      );
    } else {
      window.location.href = "/login";
    }
  }
})();

const logout = async () => {
  const res = await fetch("/api/users/logout");
  const data = await res.json();

  console.log(data);

  data.status === "success" && (window.location.href = "/login");
};
