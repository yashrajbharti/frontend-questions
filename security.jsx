import DOMPurify from 'dompurify';

const sanitizedHtml = DOMPurify.sanitize(dirtyHtml);

<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

// npm install dompurify


// Full example

import React, { useState } from 'react';
import DOMPurify from 'dompurify';

// Functional component that takes dirty HTML and renders sanitized HTML
const SafeHtmlRenderer = ({ dirtyHtml }) => {
  // Sanitize the dirty HTML using DOMPurify
  const sanitizedHtml = DOMPurify.sanitize(dirtyHtml);

  return (
    <div
      // Using dangerouslySetInnerHTML after sanitizing the content
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

// Example of how this component can be used
const App = () => {
  const [dirtyHtml, setDirtyHtml] = useState('<script>alert("Hacked!");</script><p>Hello, world!</p>');

  return (
    <div>
      <h1>Sanitized HTML</h1>
      {/* Pass dirty HTML to SafeHtmlRenderer component */}
      <SafeHtmlRenderer dirtyHtml={dirtyHtml} />
    </div>
  );
};

export default App;
