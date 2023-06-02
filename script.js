// Comic pages and chapter information
const chapters = {

    prologue: {
        pages: [
            "comic/prologue/page1.png",
            "comic/prologue/page2.png",
            "comic/prologue/page3.png",
            "comic/prologue/page4.png"
        ]
    },

    chapter1: {
        pages: [
            "comic/chapter1/page1.png",
            "comic/chapter1/page2.png",
            "comic/chapter1/page3.png",
            "comic/chapter1/page4.png"
        ]
    },

    chapter2: {
        pages: [
            "comic/chapter2/page1.png",
            "comic/chapter2/page2.png",
            "comic/chapter2/page3.png",
            "comic/chapter2/page4.png"
        ]
    },

    chapter3: {
        pages: [
            "comic/chapter3/page1.png",
            "comic/chapter3/page2.png",
            "comic/chapter3/page3.png",
            "comic/chapter3/page4.png"
        ]
    },
    
};

let currentChapter = null;
let currentPage = null;

// Load the last viewed chapter and page from localStorage, if available
if (localStorage.getItem('lastChapter')) {
    currentChapter = localStorage.getItem('lastChapter');
    currentPage = parseInt(localStorage.getItem('lastPage'));
    loadPage(chapters[currentChapter].pages[currentPage]);
    enableDisableButtons();
}

// Event listeners for chapter select, previous, and next buttons
document.getElementById('chapter-select').addEventListener('change', function() {
    currentChapter = this.value;
    currentPage = 0;
    loadPage(chapters[currentChapter].pages[currentPage]);
    enableDisableButtons();
    saveLastViewed();
});

document.getElementById('previous-btn').addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        loadPage(chapters[currentChapter].pages[currentPage]);
        enableDisableButtons();
        saveLastViewed();
    }
});

document.getElementById('next-btn').addEventListener('click', function() {
    if (currentPage < chapters[currentChapter].pages.length - 1) {
        currentPage++;
        loadPage(chapters[currentChapter].pages[currentPage]);
        enableDisableButtons();
        saveLastViewed();
    }
});

// Function to load the comic page
function loadPage(pageUrl) {
    const imageElement = document.getElementById('comic-image');
    imageElement.src = pageUrl;
}

// Function to enable/disable previous and next buttons
function enableDisableButtons() {
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');
    previousBtn.disabled = (currentPage === 0);
    nextBtn.disabled = (currentPage === chapters[currentChapter].pages.length - 1);
}

// Function to save the last viewed chapter and page to localStorage
function saveLastViewed() {
    localStorage.setItem('lastChapter', currentChapter);
    localStorage.setItem('lastPage', currentPage.toString());
}
