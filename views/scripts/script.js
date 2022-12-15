// toggle hamburger menu
const menu = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const close = document.querySelector(".close-btn");

menu.addEventListener("click", () => {
	mobileNav.classList.add("show");
});

close.addEventListener("click", () => {
	mobileNav.classList.remove("show");
});

function myFunction() {
	console.log("work");
	document.querySelector("input[type='password']").toggleAttribute = "text";
};
