const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterButtons = document.querySelectorAll(".filters button");

let currentIndex = 0;
let visibleImages = [...images];

/* Open Lightbox */
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = visibleImages.indexOf(img);
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

/* Close Lightbox */
closeBtn.onclick = () => lightbox.style.display = "none";

/* Navigation */
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex =
    (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
};

/* Filter */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    visibleImages = [];

    images.forEach(img => {
      if (filter === "all" || img.dataset.category === filter) {
        img.style.display = "block";
        visibleImages.push(img);
      } else {
        img.style.display = "none";
      }
    });
  });
});
