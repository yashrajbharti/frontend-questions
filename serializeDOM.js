function serializeDOM(element) {
  if (!element || element.nodeType !== 1) return null; // Ignore non-element nodes

  return {
    type: element.tagName.toLowerCase(), // Store tag name in lowercase
    props: serializeAttributes(element.attributes), // Convert attributes to an object
    children: Array.from(element.childNodes)
      .map((child) =>
        child.nodeType === 3 ? child.textContent : serializeDOM(child)
      ) // Handle text nodes separately
      .filter(Boolean),
  };
}

function serializeAttributes(attributes) {
  return Array.from(attributes).reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {});
}

// const appElement = document.getElementById("app");
// const virtualDOM = serializeDOM(appElement);

// console.log(virtualDOM);

// {
//   "type": "div",
//   "props": {
//     "id": "app"
//   },
//   "children": [
//     {
//       "type": "h1",
//       "props": {
//         "class": "title"
//       },
//       "children": ["Hello, Virtual DOM!"]
//     },
//     {
//       "type": "p",
//       "props": {},
//       "children": ["Learning Virtual DOM Serialization"]
//     }
//   ]
// }
