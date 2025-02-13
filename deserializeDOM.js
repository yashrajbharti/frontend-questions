function deserializeDOM(vNode) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode); // Handle text nodes
  }

  if (!vNode || !vNode.type) return null; // Ignore invalid nodes

  const element = document.createElement(vNode.type); // Create an element

  // Set attributes
  for (const [key, value] of Object.entries(vNode.props || {})) {
    element.setAttribute(key, value);
  }

  // Recursively append children
  (vNode.children || []).forEach((child) => {
    element.appendChild(deserializeDOM(child));
  });

  return element;
}

// const virtualDOM = {
//   type: "div",
//   props: { id: "app" },
//   children: [
//     {
//       type: "h1",
//       props: { class: "title" },
//       children: ["Hello, Virtual DOM!"],
//     },
//     {
//       type: "p",
//       props: {},
//       children: ["Learning Virtual DOM Deserialization"],
//     },
//   ],
// };

// // Convert Virtual DOM to real DOM
// const realDOM = deserializeDOM(virtualDOM);

// // Append to the document
// document.body.appendChild(realDOM);

// OUTPUT
// <div id="app">
//   <h1 class="title">Hello, Virtual DOM!</h1>
//   <p>Learning Virtual DOM Deserialization</p>
// </div>
