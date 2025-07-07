const cards = document.querySelectorAll(".card");
const dotsContainer = document.querySelector(".dots");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

// Crear dots dinámicamente
function createDots() {
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => updateCarousel(index));
    dotsContainer.appendChild(dot);
  });
}

// Inicializar dots
createDots();
const dots = document.querySelectorAll(".dot");

function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards.length) % cards.length;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );

    if (offset === 0) {
      card.classList.add("center");
    } else if (offset === 1) {
      card.classList.add("right-1");
    } else if (offset === 2) {
      card.classList.add("right-2");
    } else if (offset === cards.length - 1) {
      card.classList.add("left-1");
    } else if (offset === cards.length - 2) {
      card.classList.add("left-2");
    } else {
      card.classList.add("hidden");
    }
  });

  // Actualizar dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

// Event listeners
leftArrow.addEventListener("click", () => {
  updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
  updateCarousel(currentIndex + 1);
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    updateCarousel(i);
  });

  // Efecto hover para mostrar texto
  card.addEventListener("mouseenter", () => {
    const text = card.querySelector("p");
    text.style.opacity = "1";
    text.style.transform = "translateY(0)";
  });

  card.addEventListener("mouseleave", () => {
    const text = card.querySelector("p");
    text.style.opacity = "0";
    text.style.transform = "translateY(20px)";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateCarousel(currentIndex - 1);
  } else if (e.key === "ArrowRight") {
    updateCarousel(currentIndex + 1);
  }
});

// Swipe para móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1);
    } else {
      updateCarousel(currentIndex - 1);
    }
  }
}

updateCarousel(0);
