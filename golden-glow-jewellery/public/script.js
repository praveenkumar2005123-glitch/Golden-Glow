const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusText.textContent = "";
  statusText.className = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Unable to send your message.");
    statusText.textContent = "Thank you! Your message has been sent successfully.";
    statusText.className = "success";
    form.reset();
  } catch (error) {
    statusText.textContent = error.message || "Something went wrong. Please try again.";
    statusText.className = "error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
