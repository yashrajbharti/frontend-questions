class TextEditor {
  constructor(k) {
    this.text = "";
    this.history = [];
    this.k = k;
  }

  type(str) {
    this.saveState();
    this.text += str;
  }

  delete(n) {
    this.saveState();
    this.text = this.text.slice(0, -n);
  }

  saveState() {
    this.history.push(this.text);
  }

  undo() {
    let steps = Math.min(this.k, this.history.length);
    while (steps > 0 && this.history.length > 0) {
      this.text = this.history.pop();
      steps--;
    }
  }

  getText() {
    return this.text;
  }
}

function processOperations(operations, k) {
  const editor = new TextEditor(k);

  for (const op of operations) {
    if (op.startsWith("type:")) {
      editor.type(op.split(":")[1]);
    } else if (op.startsWith("delete:")) {
      editor.delete(parseInt(op.split(":")[1], 10));
    }
  }

  editor.undo();
  return editor.getText();
}

// Example usage:
const operations = ["type:Hello", "type: World", "delete:1"];
const k = 2;
console.log(processOperations(operations, k)); // Output: "Hello"
