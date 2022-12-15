// 2. Create a catalog - POST request to '/api/catalog' with data { businessName, catalogImage, categoryName }
const section = document.getElementById("section");

const createInput = (type, value) => {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("value", value);
  return input;
};

const createSection = (data) => {
  // create form element
  const form = document.createElement("form");
  form.setAttribute("onSubmit", "createCatalog()");
  // productName, description, image, price;
  const productName = createInput("text", data.productName);
  const description = createInput("text", data.description);
  const price = createInput("number", data.price);
  console.log(productName);
  form.appendChild(productName);
  form.appendChild(description);
  form.appendChild(price);
  section.appendChild(form);
};

window.addEventListener("load", async () => {
  localStorage.removeItem("catalogId");
  //   check if user is authenticated
  const dbUser = await fetch("/api/users/session", {
    credentials: "include",
  });

  const session = await dbUser.json();

  if (session.status === "Error") {
    // redirect to login page
    console.log("redirecting....");
  }
});

const createCatalog = async (event) => {
  event.preventDefault();

  // generate a new catalogId
  let catalogId;
  const localId = localStorage.getItem("catalogId");

  if (localId) {
    catalogId = JSON.parse(localId);
  } else {
    catalogId = Date.now();
    console.log(catalogId);
    localStorage.setItem("catalogId", JSON.stringify(catalogId));
  }

  // get form values
  const formData = new FormData(event.target);
  const formEntries = Object.fromEntries(formData.entries());

  // process the image to base64
  const file = formEntries.productImage;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    formEntries.productImage = undefined;
    // send request to backend
    const res = await fetch("/api/product/addProduct", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...formEntries, image: reader.result, catalogId }),
    });

    const data = await res.json();
    // clear formEntries

    // create Input
    createSection(data.data);
  };
};
