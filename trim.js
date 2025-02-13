function customTrim(str) {
  let start = 0,
    end = str.length - 1;

  while (start <= end && str[start] === " ") {
    start++;
  }

  while (end >= start && str[end] === " ") {
    end--;
  }

  return str.slice(start, end + 1);
}

// console.log(customTrim("   Hello World!   ")); // Output: "Hello World!"

// console.log(customTrim("NoSpaces")); // Output: "NoSpaces"

// console.log(customTrim("   Trim this   ")); // Output: "Trim this"

// console.log(customTrim("       ")); // Output: ""

// console.log(customTrim("")); // Output: ""
