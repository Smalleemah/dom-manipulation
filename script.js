let quotes = [];
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    try {
      quotes = JSON.parse(storedQuotes);
    } catch {
      quotes = [];
    }
  } else {
    quotes = [
      { text: "The best way to predict the future is to invent it.", category: "Motivation" },
      { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
    ];
  }
}
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}
function showRandomQuote() {
  const display = document.getElementById('quoteDisplay');

  if (quotes.length === 0) {
    display.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  display.textContent = `"${quote.text}" - Category: ${quote.category}`;
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });
  saveQuotes();

  textInput.value = "";
  categoryInput.value = "";
  showRandomQuote();
}
// Export quotes to JSON file
function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON format");
      quotes = importedQuotes;
      saveQuotes();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Failed to import quotes: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}
window.onload = () => {
  loadQuotes();
  showRandomQuote();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
};