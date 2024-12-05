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

function handleSubmit(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const form = document.getElementById("consultation-form");

  grecaptcha.ready(async () => {
    try {
      // Execute reCAPTCHA and get the token
      const token = await grecaptcha.execute("6LfVtpIqAAAAAAFtdzD58iQvvwxhNVzz_DayrQ8Z", { action: "submit" });

      // Attach the token to the hidden input field
      document.getElementById("g-recaptcha-response").value = token;

      // Collect form data
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());

      // Submit the data to the Netlify function for validation
      const response = await fetch("/.netlify/functions/validate-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
      });

      const result = await response.json();

      if (result.success && result.score > 0.5) {
        // If reCAPTCHA validation passes, submit the form to Netlify
        const netlifyFormData = new FormData(form); // Netlify uses FormData format
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(netlifyFormData).toString(),
        });

        // Show the success section
        document.getElementById("contact-form").classList.add("d-none");
        document.getElementById("success-section").classList.remove("d-none");
      } else {
        alert("Failed reCAPTCHA verification. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again later.");
    }
  });
}

function resetForm() {
  // Reset the form
  const form = document.getElementById("consultation-form");
  form.reset();

  document.getElementById("success-section").classList.add("d-none");
  document.getElementById("contact-form").classList.remove("d-none");
}
