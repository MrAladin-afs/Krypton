// Enhance code blocks with proper language detection and copy functionality
function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll(".prose pre");

  codeBlocks.forEach((block) => {
    // 1. Add copy button if not already present
    if (!block.querySelector(".copy-button")) {
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.textContent = "Copy";

      block.appendChild(copyButton);

      copyButton.addEventListener("click", () => {
        const code = block.querySelector("code");
        if (code) {
          navigator.clipboard
            .writeText(code.textContent || "")
            .then(() => {
              copyButton.textContent = "Copied!";
              copyButton.classList.add("copied");

              setTimeout(() => {
                copyButton.textContent = "Copy";
                copyButton.classList.remove("copied");
              }, 2000);
            })
            .catch((err) => {
              console.error("Failed to copy: ", err);
              copyButton.textContent = "Failed";

              setTimeout(() => {
                copyButton.textContent = "Copy";
              }, 2000);
            });
        }
      });
    }

    // 2. Fix language detection
    const code = block.querySelector("code");
    if (code && code.className) {
      const langMatch = code.className.match(/language-(\w+)/);
      if (langMatch && langMatch[1]) {
        block.setAttribute("data-language", langMatch[1]);
      } else {
        block.setAttribute("data-language", "text");
      }
    } else {
      block.setAttribute("data-language", "text");
    }
  });
}

// Run on initial load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enhanceCodeBlocks);
} else {
  enhanceCodeBlocks();
}

// Run when Astro swaps pages
document.addEventListener("astro:page-load", enhanceCodeBlocks);

// Run after any dynamic content changes
const observer = new MutationObserver((mutations) => {
  let shouldEnhance = false;
  for (const mutation of mutations) {
    if (
      mutation.type === "childList" &&
      Array.from(mutation.addedNodes).some(
        (node) =>
          node.nodeType === 1 &&
          (node.classList?.contains("prose") || node.querySelector?.(".prose"))
      )
    ) {
      shouldEnhance = true;
      break;
    }
  }

  if (shouldEnhance) {
    enhanceCodeBlocks();
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
} else {
  observer.observe(document.body, { childList: true, subtree: true });
}

// Force run after a short delay to catch any late-loading content
setTimeout(enhanceCodeBlocks, 500);
setTimeout(enhanceCodeBlocks, 1500);
