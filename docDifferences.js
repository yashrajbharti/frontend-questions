function compareDocuments(doc1, doc2) {
  const lines1 = doc1.split("\n");
  const lines2 = doc2.split("\n");
  const maxLength = Math.max(lines1.length, lines2.length);
  let differences = [];

  for (let i = 0; i < maxLength; i++) {
    if (lines1[i] !== lines2[i]) {
      differences.push({
        line: i + 1,
        doc1: lines1[i] || "",
        doc2: lines2[i] || "",
      });
    }
  }

  return differences;
}

// Example usage
const docA = `Hello World
  This is a test document.
  Line three is here.`;

const docB = `Hello World
  This is a different document.
  Line four is new.`;

console.log(compareDocuments(docA, docB));
