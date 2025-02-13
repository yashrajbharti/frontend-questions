class CustomHistory {
  constructor() {
    this.historyStack = []; // Stores visited URLs
    this.currentIndex = -1; // Tracks the current position
  }

  push(url) {
    // Remove forward history if new navigation happens
    this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
    this.historyStack.push(url);
    this.currentIndex++;
    console.log(`Navigated to: ${url}`);
  }

  back() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      console.log(`Back to: ${this.historyStack[this.currentIndex]}`);
      return this.historyStack[this.currentIndex];
    }
    console.log("No more history to go back.");
    return null;
  }

  forward() {
    if (this.currentIndex < this.historyStack.length - 1) {
      this.currentIndex++;
      console.log(`Forward to: ${this.historyStack[this.currentIndex]}`);
      return this.historyStack[this.currentIndex];
    }
    console.log("No forward history available.");
    return null;
  }

  replace(url) {
    if (this.currentIndex >= 0) {
      this.historyStack[this.currentIndex] = url;
      console.log(`Replaced current URL with: ${url}`);
    } else {
      this.push(url);
    }
  }

  getCurrent() {
    return this.historyStack[this.currentIndex] || null;
  }
}

/**
 *
 * const browserHistory = new CustomHistory();
 *
 * browserHistory.push("https://example.com");
 * browserHistory.push("https://example.com/about");
 * browserHistory.push("https://example.com/contact");
 *
 * browserHistory.back(); // Output: Back to: https://example.com/about
 * browserHistory.back(); // Output: Back to: https://example.com
 * browserHistory.forward(); // Output: Forward to: https://example.com/about
 *
 * browserHistory.replace("https://example.com/home"); // Replaces current URL
 * console.log(browserHistory.getCurrent()); // Output: https://example.com/home
 *
 */
