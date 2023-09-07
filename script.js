// Comic pages and chapter information
const chapters = {
  prologue: {
    pages: [
      "comic/prologue/Page 1.png",
      "comic/prologue/Page 2.png",
      "comic/prologue/Page 3.png",
      "comic/prologue/Page 4.png",
      "comic/prologue/Page 5.png"
    ]
  },
  chapter1: {
    pages: [
      "comic/chapter1/page1.png",
      "comic/chapter1/page2.png",
      "comic/chapter1/page3.png",
      "comic/chapter1/page4.png"
    ]
  }
};

let currentChapter = null;
let currentPage = null;

// Function to load the comic page
function loadPage(pageUrl) {
  const imageElement = document.getElementById("comic-image");
  imageElement.src = pageUrl;

  // Extract the name of the HTML page
  const pageName = pageUrl.split("/").pop().split(".")[0];

  // Update the page title with the comic page name
  document.title = "Magic Star Comic - " + pageName;

  // Update the URL to reflect the current chapter and page
  updateURL();
}

// Function to enable/disable previous and next buttons
function enableDisableButtons() {
  const previousBtn = document.getElementById("previous-btn");
  const nextBtn = document.getElementById("next-btn");
  previousBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === chapters[currentChapter].pages.length - 1;
}

// Event listeners for chapter select, previous, and next buttons
const chapterSelect = document.getElementById("chapter-select");

// Clear existing options
chapterSelect.innerHTML = "";

// Populate dropdown options
for (const chapter in chapters) {
  const option = document.createElement("option");
  option.value = chapter;
  option.textContent = chapter;
  chapterSelect.appendChild(option);
}

chapterSelect.addEventListener("change", function () {
  currentChapter = this.value;
  currentPage = 0;
  loadPage(chapters[currentChapter].pages[currentPage]);
  enableDisableButtons();
  saveLastViewed();
});

document.getElementById("previous-btn").addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    loadPage(chapters[currentChapter].pages[currentPage]);
    enableDisableButtons();
    saveLastViewed();
  }
});

document.getElementById("next-btn").addEventListener("click", function () {
  if (currentPage < chapters[currentChapter].pages.length - 1) {
    currentPage++;
    loadPage(chapters[currentChapter].pages[currentPage]);
    enableDisableButtons();
    saveLastViewed();
  }
});

// Function to save the last viewed chapter and page to localStorage
function saveLastViewed() {
  localStorage.setItem("lastChapter", currentChapter);
  localStorage.setItem("lastPage", currentPage.toString());
}

// Function to update the URL based on the current chapter and page
function updateURL() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("chapter", currentChapter);
  urlParams.set("page", currentPage.toString());
  history.replaceState(null, "", `${location.pathname}?${urlParams.toString()}`);
}

// Function to initialize the page based on the URL parameters
function initializeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const chapterParam = urlParams.get("chapter");
  const pageParam = parseInt(urlParams.get("page"));

  if (chapterParam && chapters[chapterParam]) {
    currentChapter = chapterParam;
  } else {
    // Default to the first chapter if chapterParam is not valid
    currentChapter = Object.keys(chapters)[0];
  }

  if (pageParam >= 0 && pageParam < chapters[currentChapter].pages.length) {
    currentPage = pageParam;
  } else {
    // Default to the first page if pageParam is not valid
    currentPage = 0;
  }

  loadPage(chapters[currentChapter].pages[currentPage]);
  enableDisableButtons();
  saveLastViewed();
}

// Initialize the page based on the URL parameters when the page loads
initializeFromURL();
