/**
 * Calculate reading time for a given text
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns Object with reading time in minutes and word count
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200) {
  // Remove HTML tags and extra whitespace
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Count words
  const wordCount = cleanText.split(' ').filter(word => word.length > 0).length;
  
  // Calculate reading time
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    wordCount,
    readingTime,
    text: readingTime === 1 ? '1 min read' : `${readingTime} min read`
  };
}

/**
 * Extract text content from HTML string
 * @param html - HTML string
 * @returns Plain text content
 */
export function extractTextFromHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
