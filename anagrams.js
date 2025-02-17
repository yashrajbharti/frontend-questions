function areAnagrams(str1, str2) {
  // Remove spaces and convert to lowercase
  str1 = str1.replace(/\s+/g, "").toLowerCase();
  str2 = str2.replace(/\s+/g, "").toLowerCase();

  // Sort both strings and compare
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

// Example usage
console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world")); // false

const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let char = "";
  for (let i = 0; i < s.length; i++) {
    char = s.charAt(i);
    if (t.includes(char)) {
      t = t.substring(0, t.indexOf(char)) + t.substring(t.indexOf(char) + 1);
    } else {
      return false;
    }
  }
  return true;
};
