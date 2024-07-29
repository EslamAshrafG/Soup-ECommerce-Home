"use strict";
//------------ Navigation bar ------------
const navLinks = document.querySelector(".links");
const navShowBtn = document.querySelector(".toggle-bar");

// Nested about links
const aboutLinkBtn = document.querySelector(".link.about a");
const aboutPages = document.querySelector(".about-pages");
aboutLinkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  aboutPages.classList.toggle("show");
});

window.addEventListener("resize", function (e) {
  const screenWidth = e.target.innerWidth;
  if (screenWidth < 750) {
    navLinks.classList.add("hide");
    navShowBtn.classList.remove("hide");
  } else {
    navLinks.classList.remove("hide");
    navShowBtn.classList.add("hide");
  }
});
navShowBtn.addEventListener("click", () => navLinks.classList.toggle("hide"));

// Make it Sticky
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;
const landingSection = document.querySelector(".landing");

function stickyNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const sectionObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px 0px 0px 0px`,
});

sectionObserver.observe(landingSection);

//------------ Navigation bar ------------

//------------ Landing Slider ------------

// Main Variables
const slideRight = document.querySelector(".slide-right");
const slideLeft = document.querySelector(".slide-left");
const imgSlides = [...document.querySelectorAll(".img-slider")];
const descSlides = [...document.querySelectorAll(".desc")];
let currentLandingSlide = 0;
const maxSlides = imgSlides.length;

// Slider functions
// prettier-ignore
const orderElement = (element, slideNumber = 0) => (element.style.left = `${(slideNumber - element.dataset.slide) * 105}%`);

function initSlide(slides, left = 105) {
  slides.forEach((slide) => orderElement(slide, 0, left));
}

const nextSlide = function (currentSlideNumber, slides, orderFunction) {
  const slideLimit = slides.length;
  if (currentSlideNumber >= slideLimit - 1) {
    currentSlideNumber = 0;
  } else {
    currentSlideNumber++;
  }
  slides.forEach((slide) => orderFunction(slide, currentSlideNumber));
  return currentSlideNumber;
};

const prevSlide = function (currentSlideNumber, slides, orderFunction) {
  const slideLimit = slides.length;
  if (currentSlideNumber <= 0) {
    currentSlideNumber = slideLimit - 1;
  } else {
    currentSlideNumber--;
  }
  slides.forEach((slide) => orderFunction(slide, currentSlideNumber));
  return currentSlideNumber;
};

// Handle slides
initSlide(imgSlides);
initSlide(descSlides);

// auto sliding effect
setInterval(() => {
  nextSlide(currentLandingSlide, imgSlides, orderElement);
  currentLandingSlide = nextSlide(
    currentLandingSlide,
    descSlides,
    orderElement
  );
}, 10 * 1000);

slideRight.addEventListener("click", () => {
  nextSlide(currentLandingSlide, imgSlides, orderElement);
  currentLandingSlide = nextSlide(
    currentLandingSlide,
    descSlides,
    orderElement
  );
});

slideLeft.addEventListener("click", () => {
  prevSlide(currentLandingSlide, imgSlides, orderElement);
  currentLandingSlide = prevSlide(
    currentLandingSlide,
    descSlides,
    orderElement
  );
});

//------------ Landing Slider ------------

//------------ Menu ------------
const showMoreMealsBtn = document.querySelector(".show-more");
const mealsContainer = document.querySelector(".menu .container");

function expandElement(element) {
  element.style.height = element.scrollHeight + "px"; // Set height to the element's scroll height
  element.classList.add("expanded"); // Add the expanded class
}

function collapseElement(element) {
  element.style.height = "430px"; // Set height to 0
  element.classList.remove("expanded"); // Remove the expanded class
}

// Toggle the element's expansion state
function toggleElement(element) {
  if (element.classList.contains("expanded")) {
    collapseElement(element);
    showMoreMealsBtn.innerHTML = "";
    showMoreMealsBtn.insertAdjacentHTML(
      "afterbegin",
      `<i class="fa fa-arrow-down fa-2x"></i>`
    );
  } else {
    expandElement(element);
    showMoreMealsBtn.innerHTML = "";
    showMoreMealsBtn.insertAdjacentHTML(
      "afterbegin",
      `<i class="fa fa-arrow-up fa-2x"></i>`
    );
  }
}

showMoreMealsBtn.addEventListener("click", function () {
  toggleElement(mealsContainer);
});
//------------ Menu ------------

//------------ offers slider ------------

// Main Variables
const offersSlides = [
  ...document.querySelectorAll(".offers .container .offer"),
];
const slideRightBtn = document.querySelector(".offers .sliding.fa-arrow-right");
const slideLeftBtn = document.querySelector(".offers .sliding.fa-arrow-left");
let currOffer = 0;

// Main Functions
const orderOffers = (offers, currOfferNumber = 0) => {
  offersSlides.forEach(
    (offer) =>
      (offer.style.left = `${
        (currOfferNumber - offer.dataset.slide) * 100 + 50
      }%`)
  );
};

// Initial slides position
orderOffers(offersSlides);

// Handle events
slideRightBtn.addEventListener("click", () => {
  currOffer = nextSlide(currOffer, offersSlides, orderOffers);
});
slideLeftBtn.addEventListener("click", () => {
  currOffer = prevSlide(currOffer, offersSlides, orderOffers);
});
//------------ offers slider ------------

//------------ Video player ------------
const playBtn = document.querySelector(".play-video");
const videoFrame = document.querySelector(".video-player");
const bgOverlay = document.querySelector(".overlay");
const closePlayer = document.querySelector(".close-video");

function openVideo() {
  videoFrame.classList.remove("hide");
  bgOverlay.classList.remove("hide");
  closePlayer.classList.remove("hide");
}
function closeVideo() {
  videoFrame.classList.add("hide");
  bgOverlay.classList.add("hide");
  closePlayer.classList.add("hide");
}

playBtn.addEventListener("click", openVideo);

// Closing player
closePlayer.addEventListener("click", closeVideo);
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeVideo();
});
bgOverlay.addEventListener("click", closeVideo);
//------------ Video player ------------

//------------ Scroll effect ------------
const allSections = document.querySelectorAll(".section");
allSections.forEach((section) => section.classList.add("translateDown"));
console.log(allSections);

function translateUp(entries, observe) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove("translateDown");
    observe.unobserve(entry.target);
  }
}

const sectionsObserver = new IntersectionObserver(translateUp, {
  threshold: 0.07,
  root: null,
});

allSections.forEach((section) => sectionsObserver.observe(section));

// Scroll to top
const scrollToTopBtn = document.querySelector(".scroll-top");

scrollToTopBtn.addEventListener("click", function () {
  landingSection.scrollIntoView({
    behavior: "smooth",
  });
});
