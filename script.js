// Comic pages and chapter information
const chapters = {
    prologue: {
      pages: [
        "comic/prologue/Page 1.png",
        "comic/prologue/Page 2.png",
        "comic/prologue/Page 3.png",
        "comic/prologue/Page 4.png"
      ]
    },
    chapter1: {
      pages: [
        "comic/chapter1/Page 1.png",
        "comic/chapter1/Page 2.png",
        "comic/chapter1/Page 3.png",
        "comic/chapter1/Page 4.png"
      ]
    },
    chapter2: {
      pages: [
        "comic/chapter2/Page 1.png",
        "comic/chapter2/Page 2.png",
        "comic/chapter2/Page 3.png",
        "comic/chapter2/Page 4.png"
      ]
    },
    chapter3: {
      pages: [
        "comic/chapter3/Page 1.png",
        "comic/chapter3/Page 2.png",
        "comic/chapter3/Page 3.png",
        "comic/chapter3/Page 4.png"
      ]
    },
    chapter4: {
      pages: [
        "comic/chapter4/Page 1.png",
        "comic/chapter4/Page 2.png",
        "comic/chapter4/Page 3.png",
        "comic/chapter4/Page 4.png"
      ]
    }
  };
  
  let currentChapter = null;
  let currentPage = null;
  
  // Load the last viewed chapter and page from localStorage, if available
  if (localStorage.getItem("lastChapter")) {
    currentChapter = localStorage.getItem("lastChapter");
    currentPage = parseInt(localStorage.getItem("lastPage"));
    loadPage(chapters[currentChapter].pages[currentPage]);
    enableDisableButtons();
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
  
  // Function to load the comic page
  function loadPage(pageUrl) {
    const imageElement = document.getElementById("comic-image");
    imageElement.src = pageUrl;
  
    // Extract the name of the HTML page
    const pageName = pageUrl.split("/").pop().split(".")[0];
  
    // Update the page title with the comic page name
    document.title = "Magic Star Comic - " + pageName;
  }
  
  // Function to enable/disable previous and next buttons
  function enableDisableButtons() {
    const previousBtn = document.getElementById("previous-btn");
    const nextBtn = document.getElementById("next-btn");
    previousBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === chapters[currentChapter].pages.length - 1;
  }
  
  // Function to save the last viewed chapter and page to localStorage
  function saveLastViewed() {
    localStorage.setItem("lastChapter", currentChapter);
    localStorage.setItem("lastPage", currentPage.toString());
  }
  
