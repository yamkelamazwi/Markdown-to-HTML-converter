const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");
const charCount = document.getElementById("char-count");
const copyButton = document.getElementById("copy-btn");
const clearButton = document.getElementById("clear-btn");

function convertMarkdown() {
  let markdown = markdownInput.value;

  let html = markdown
    .replace(/^\s*### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^\s*## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^\s*# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img alt="$1" src="$2">'
    )
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2">$1</a>'
    )
    .replace(
      /^\s*>\s(.*)$/gm,
      "<blockquote>$1</blockquote>"
    );

  return html;
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();

  htmlOutput.textContent = html;
  preview.innerHTML = html;

  charCount.textContent = `Characters: ${markdownInput.value.length}`;
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(htmlOutput.textContent);

  copyButton.textContent = "Copied!";

  setTimeout(() => {
    copyButton.textContent = "Copy HTML";
  }, 2000);
});

clearButton.addEventListener("click", () => {
  markdownInput.value = "";
  htmlOutput.textContent = "";
  preview.innerHTML = "";
  charCount.textContent = "Characters: 0";
});
