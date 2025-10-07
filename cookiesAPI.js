/**
 * Browser Cookies API
 *
 * Working with document.cookie - setting, getting, and deleting cookies.
 * Small storage (4KB), sent with every HTTP request, has expiration.
 */

// Basic cookie operations

// 1. Set a cookie
function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// 2. Get a cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

// 3. Delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// 4. Check if cookie exists
function hasCookie(name) {
  return getCookie(name) !== null;
}

// Advanced cookie options

// Set cookie with all options
function setCookieAdvanced(name, value, options = {}) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Max age (in seconds)
  if (options.maxAge) {
    cookieString += `;max-age=${options.maxAge}`;
  }

  // Expires (Date object)
  if (options.expires) {
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }

  // Path
  cookieString += `;path=${options.path || "/"}`;

  // Domain
  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }

  // Secure (HTTPS only)
  if (options.secure) {
    cookieString += ";secure";
  }

  // SameSite
  if (options.sameSite) {
    cookieString += `;samesite=${options.sameSite}`;
  }

  // HttpOnly (can't be accessed via JavaScript - must be set server-side)
  // if (options.httpOnly) {
  //   cookieString += ';httponly'; // Not possible from client-side JS
  // }

  document.cookie = cookieString;
}

// Get all cookies as object
function getAllCookies() {
  const cookies = {};
  const cookieArray = document.cookie.split(";");

  for (const cookie of cookieArray) {
    const [name, value] = cookie.trim().split("=");
    if (name) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value || "");
    }
  }

  return cookies;
}

// Practical examples

// 1. Session management
const SessionCookie = {
  set(sessionId, days = 30) {
    setCookieAdvanced("session_id", sessionId, {
      maxAge: days * 24 * 60 * 60,
      secure: true,
      sameSite: "Strict",
    });
  },

  get() {
    return getCookie("session_id");
  },

  clear() {
    deleteCookie("session_id");
  },

  isActive() {
    return hasCookie("session_id");
  },
};

// 2. Remember me functionality
function rememberUser(username, remember = false) {
  if (remember) {
    setCookieAdvanced("username", username, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: true,
    });
  } else {
    deleteCookie("username");
  }
}

function getRememberedUser() {
  return getCookie("username");
}

// 3. Cookie consent
const CookieConsent = {
  set(accepted) {
    setCookieAdvanced("cookie_consent", accepted ? "true" : "false", {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: "/",
    });
  },

  get() {
    return getCookie("cookie_consent") === "true";
  },

  hasResponded() {
    return hasCookie("cookie_consent");
  },
};

// 4. Theme preference
const ThemeCookie = {
  set(theme) {
    setCookieAdvanced("theme", theme, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });
  },

  get() {
    return getCookie("theme") || "light";
  },
};

// 5. Language preference
function setLanguage(lang) {
  setCookieAdvanced("lang", lang, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
  });
}

function getLanguage() {
  return getCookie("lang") || "en";
}

// 6. Cookie banner management
class CookieBanner {
  constructor() {
    this.consentKey = "gdpr_consent";
  }

  show() {
    if (!this.hasConsent()) {
      // Show banner UI
      console.log("Showing cookie banner");
    }
  }

  accept(categories = ["necessary", "analytics", "marketing"]) {
    setCookieAdvanced(
      this.consentKey,
      JSON.stringify({
        categories,
        timestamp: Date.now(),
      }),
      {
        maxAge: 365 * 24 * 60 * 60,
      }
    );
  }

  reject() {
    setCookieAdvanced(
      this.consentKey,
      JSON.stringify({
        categories: ["necessary"],
        timestamp: Date.now(),
      }),
      {
        maxAge: 365 * 24 * 60 * 60,
      }
    );
  }

  hasConsent() {
    return hasCookie(this.consentKey);
  }

  getConsent() {
    const consent = getCookie(this.consentKey);
    return consent ? JSON.parse(consent) : null;
  }
}

// 7. Shopping cart in cookie (for small data)
const CartCookie = {
  add(productId) {
    const cart = this.get();
    cart.push(productId);
    setCookieAdvanced("cart", JSON.stringify(cart), {
      maxAge: 7 * 24 * 60 * 60,
    });
  },

  get() {
    const cart = getCookie("cart");
    return cart ? JSON.parse(cart) : [];
  },

  clear() {
    deleteCookie("cart");
  },

  count() {
    return this.get().length;
  },
};

// 8. Tracking last visit
function trackLastVisit() {
  const lastVisit = getCookie("last_visit");
  const now = new Date().toISOString();

  if (lastVisit) {
    console.log("Last visit:", lastVisit);
  }

  setCookieAdvanced("last_visit", now, {
    maxAge: 365 * 24 * 60 * 60,
  });
}

// 9. Cookie utilities
const CookieUtils = {
  // Count total cookies
  count() {
    return Object.keys(getAllCookies()).length;
  },

  // Clear all cookies
  clearAll() {
    const cookies = getAllCookies();
    for (const name in cookies) {
      deleteCookie(name);
    }
  },

  // Cookie size
  getSize() {
    return document.cookie.length;
  },

  // Is cookie storage available
  isAvailable() {
    try {
      const test = "__cookie_test__";
      setCookie(test, "test");
      const available = hasCookie(test);
      deleteCookie(test);
      return available;
    } catch {
      return false;
    }
  },
};

// SameSite options explained
/*
- Strict: Cookie only sent in first-party context (same site)
- Lax: Cookie sent on top-level navigation (default)
- None: Cookie sent in all contexts (requires Secure flag)
*/

// Security best practices
const SecureCookie = {
  set(name, value) {
    setCookieAdvanced(name, value, {
      secure: true, // HTTPS only
      sameSite: "Strict", // Prevent CSRF
      maxAge: 3600, // 1 hour expiration
    });
  },
};

export {
  setCookie,
  getCookie,
  deleteCookie,
  hasCookie,
  setCookieAdvanced,
  getAllCookies,
  SessionCookie,
  CookieConsent,
  ThemeCookie,
  CookieBanner,
  CartCookie,
  CookieUtils,
};
