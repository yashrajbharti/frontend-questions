function walkTheDOM(node, callback) {
  // Apply the callback to the current node
  callback(node);

  // Recursively walk each child node
  node = node.firstChild;
  while (node) {
    walkTheDOM(node, callback);
    node = node.nextSibling;
  }
}

// example
walkTheDOM(document.body, function (node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    console.log(`<${node.tagName.toLowerCase()}>`);
  }
});

{
  /* <body>
  <div>
    <p>Hello</p>
    <span>World</span>
  </div>
</body>

body
div
p
#text (Hello)
span
#text (World) */
}
