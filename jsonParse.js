function jsonParse(jsonString) {
  let index = 0;
  const char = () => jsonString[index]; // Helper to get the current character

  const parseValue = () => {
    skipWhitespace();

    const currentChar = char();

    if (currentChar === '"') return parseString();
    if (currentChar === "{") return parseObject();
    if (currentChar === "[") return parseArray();
    if (currentChar === "t" || currentChar === "f") return parseBoolean();
    if (currentChar === "n") return parseNull();
    if (isDigit(currentChar) || currentChar === "-") return parseNumber();

    throw new SyntaxError(
      `Unexpected token ${currentChar} at position ${index}`
    );
  };

  const skipWhitespace = () => {
    while (/\s/.test(char())) {
      index++;
    }
  };

  const parseString = () => {
    index++; // Skip opening quote
    let result = "";
    while (char() !== '"') {
      if (char() === "\\") {
        index++; // Skip escape character
        const escapeChar = char();
        if (escapeChar === "n") result += "\n";
        else if (escapeChar === "t") result += "\t";
        else if (escapeChar === "r") result += "\r";
        else if (escapeChar === '"') result += '"';
        else if (escapeChar === "\\") result += "\\";
        else throw new SyntaxError("Invalid escape character");
      } else {
        result += char();
      }
      index++;
    }
    index++; // Skip closing quote
    return result;
  };

  const parseNumber = () => {
    let numStr = "";
    if (char() === "-") {
      numStr += "-";
      index++;
    }
    while (isDigit(char())) {
      numStr += char();
      index++;
    }
    if (char() === ".") {
      numStr += ".";
      index++;
      while (isDigit(char())) {
        numStr += char();
        index++;
      }
    }
    return parseFloat(numStr);
  };

  const parseBoolean = () => {
    if (jsonString.slice(index, index + 4) === "true") {
      index += 4;
      return true;
    }
    if (jsonString.slice(index, index + 5) === "false") {
      index += 5;
      return false;
    }
    throw new SyntaxError("Unexpected boolean value");
  };

  const parseNull = () => {
    if (jsonString.slice(index, index + 4) === "null") {
      index += 4;
      return null;
    }
    throw new SyntaxError("Unexpected null value");
  };

  const parseArray = () => {
    index++; // Skip opening bracket
    const result = [];
    while (char() !== "]") {
      result.push(parseValue());
      skipWhitespace();
      if (char() === ",") index++; // Skip comma between elements
      skipWhitespace();
    }
    index++; // Skip closing bracket
    return result;
  };

  const parseObject = () => {
    index++; // Skip opening brace
    const result = {};
    skipWhitespace();
    while (char() !== "}") {
      const key = parseString();
      skipWhitespace();
      if (char() !== ":")
        throw new SyntaxError("Expected colon after key in object");
      index++; // Skip colon
      const value = parseValue();
      result[key] = value;
      skipWhitespace();
      if (char() === ",") index++; // Skip comma between key-value pairs
      skipWhitespace();
    }
    index++; // Skip closing brace
    return result;
  };

  const isDigit = (char) => /[0-9]/.test(char);

  return parseValue();
}

/**
 *
 * const jsonString =
 * '{"name": "John", "age": 30, "isEmployed": true, "hobbies": ["reading", "sports"], "address": {"city": "New York", "zip": "10001"}, "spouse": null}';
 * const parsedObj = jsonParse(jsonString);
 *
 * console.log(parsedObj);
 * // Output: { name: 'John', age: 30, isEmployed: true, hobbies: [ 'reading', 'sports' ], address: { city: 'New York', zip: '10001' }, spouse: null }
 *
 */
