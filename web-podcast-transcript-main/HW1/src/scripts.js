const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const fileUpload = document.getElementById('fileUpload');
const fileNameDisplay = document.getElementById('fileName');

//const summarizeButton = document.querySelector('button[onclick="summarizeText()"]');
const outputSection = document.querySelector('.p-4.border');

const summarizeParagraph = document.getElementById("summarizeParagraph");

// Toggle theme between dark and light mode
themeToggle.addEventListener('click', () => {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    themeToggle.textContent = 'Light Mode';
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
    themeToggle.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'dark');
  }
});

// Apply saved theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
});

// File upload handler
fileUpload.addEventListener('change', () => {
  const file = fileUpload.files[0];
  fileNameDisplay.textContent = file ? `Uploaded: ${file.name}` : '';
  if (file) {
    // Hardcoded transcription table
    const transcriptionTable = `
      <h2 class="font-bold mb-2">Output:</h2>
      <table class="table-auto w-full border-collapse border border-gray-400 dark:border-gray-700 text-left">
        <thead>
          <tr>
            <th class="border border-gray-400 dark:border-gray-700 px-4 py-2">Timestamp</th>
            <th class="border border-gray-400 dark:border-gray-700 px-4 py-2">Transcription</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 dark:border-gray-700 px-4 py-2">00:00:01</td>
            <td class="border border-gray-400 dark:border-gray-700 px-4 py-2">Hello, and welcome to the podcast transcribe website.</td>
          </tr>
          <tr>
            <td class="border border-gray-400 dark:border-gray-700 px-4 py-2">00:00:10</td>
            <td class="border border-gray-400 dark:border-gray-700 px-4 py-2">This is a mock up of the transcription.</td>
          </tr>
          <tr>
            <td class="border border-gray-400 dark:border-gray-700 px-4 py-2">00:00:15</td>
            <td class="border border-gray-400 dark:border-gray-700 px-4 py-2">the transcription will show up as a table after the user uploads an audio file</td>
          </tr>
        </tbody>
      </table>
    `;

    // Display the table in the output section
    const outputSection = document.getElementById('transcribeBorder');
    outputSection.innerHTML = transcriptionTable;
  }
});

// Summarize text handler
//function summarizeText() {
 // outputSection.innerHTML = `
 //   <h2 class="font-bold mb-2">Output:</h2>
 //   <p>This is a placeholder summary for the uploaded file.</p>
 // `;
//}
//summarizeButton.addEventListener('click', summarizeText);


// Adding the setRating function for star rating
function setRating(rating) {
  const stars = document.querySelectorAll('.star');
  const ratingFeedback = document.getElementById('ratingFeedback');

  if (window.hasVoted) {
    return;
  }
  
  stars.forEach((star, index) => {
    // Check if the index is less than the rating
    if (index < rating) {
      // Apply yellow color for selected stars in both light and dark modes
      star.classList.add('text-yellow-500');
      star.classList.remove('text-gray-300', 'dark:text-gray-500');
    } else {
      // Reset to gray color in light mode and dark gray in dark mode
      star.classList.add('text-gray-300', 'dark:text-gray-500');
      star.classList.remove('text-yellow-500');
    }

    star.onclick = null;
    star.classList.remove('cursor-pointer');
    
  });
  window.hasVoted = true;
  
  // Show thank you message
  if (ratingFeedback) {
    ratingFeedback.textContent = `Thank you for rating us!`;
    ratingFeedback.style.display = 'block';
  }

}

document.getElementById("SummarizeBtn").addEventListener("click",function(){
  summarizeParagraph.style.display ="block";
});