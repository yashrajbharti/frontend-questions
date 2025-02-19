// Set a cookie (expires in 7 days)
document.cookie =
  "username=Yash; expires=" +
  new Date(Date.now() + 7 * 864e5).toUTCString() +
  "; path=/";

// Read cookies
console.log(document.cookie); // "username=Yash"

// Delete a cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

// CHIPS
// Set-Cookie: session_id=abc123; Secure; HttpOnly; SameSite=None; Partitioned

// Audience Protected API
document.interestGroup.join({
  owner: "https://example-advertiser.com",
  name: "interested-in-product-x",
  biddingLogicUrl: "https://example-advertiser.com/bid.js",
  dailyUpdateUrl: "https://example-advertiser.com/update.json",
  trustedBiddingSignalsUrl: "https://example-advertiser.com/signals.json",
});
