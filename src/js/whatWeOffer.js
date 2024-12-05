function toggleDetails(cardId) {
  // Get the card and its associated details section
  const card = document.getElementById(cardId);
  if (!card) {
    console.error(`Card with ID ${cardId} not found`);
    return;
  }

  const detailsSection = document.getElementById(cardId + "-details-section");
  if (!detailsSection) {
    console.error(`Details section for card with ID ${cardId} not found`);
    return;
  }

  const button = card.querySelector("button");
  if (!button) {
    console.error(`Button inside card with ID ${cardId} not found`);
    return;
  }

  // Check if the card is currently active
  if (card.classList.contains("active")) {
    // Hide the section and reset the card
    card.classList.remove("active");
    detailsSection.classList.add("d-none");
    button.textContent = "More";
    return;
  }

  // Hide all other sections and reset other cards/buttons
  const allCards = document.querySelectorAll(".card");
  const allDetailsSections = document.querySelectorAll(".hidden");

  allCards.forEach((c) => {
    c.classList.remove("active");
    const btn = c.querySelector("button");
    if (btn) btn.textContent = "More"; // Reset text on all buttons
  });
  allDetailsSections.forEach((section) => section.classList.add("d-none"));

  // Activate the clicked card and show its details section
  card.classList.add("active");
  detailsSection.classList.remove("d-none");
  button.textContent = "Less";

  // Smooth scroll to the revealed details section
  if (window.innerWidth <= 767) {
    detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    detailsSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function resetForm() {
  // Reset the form
  const form = document.getElementById("consultation-form");
  form.reset();

  document.getElementById("success-section").classList.add("d-none");
  document.getElementById("contact-form").classList.remove("d-none");
}

const form = document.getElementById("consultation-form");

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  try {
    // Execute reCAPTCHA and get the token
    const token = await grecaptcha.execute("6LfVtpIqAAAAAAFtdzD58iQvvwxhNVzz_DayrQ8Z", { action: "submit" });

    // Dynamically add the reCAPTCHA token to the form
    const recaptchaInput = document.createElement("input");
    recaptchaInput.setAttribute("type", "hidden");
    recaptchaInput.setAttribute("name", "g-recaptcha-response");
    recaptchaInput.setAttribute("value", token);
    form.appendChild(recaptchaInput);

    // Validate reCAPTCHA via Netlify Function
    const recaptchaResponse = await fetch("/.netlify/functions/validate-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "g-recaptcha-response": token }),
    });

    const recaptchaResult = await recaptchaResponse.json();

    if (recaptchaResult.success && recaptchaResult.score > 0.5) {
      // If reCAPTCHA is valid, remove the token field before submitting
      recaptchaInput.remove();

      // Submit the form to Netlify
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      // Show success message and hide the form
      document.getElementById("contact-form").classList.add("d-none");
      document.getElementById("success-section").classList.remove("d-none");
    } else {
      alert("Failed reCAPTCHA verification. Please try again.");
    }
  } catch (error) {
    console.error("Error during form submission:", error);
    alert("An error occurred. Please try again later.");
  }
};

form.addEventListener("submit", handleSubmit);
