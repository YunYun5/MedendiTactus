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
  detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
