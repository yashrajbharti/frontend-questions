import { useState } from "react";

export default function ControlledInput() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (val) => {
    if (!val.trim()) {
      return "This field is required.";
    }
    if (val.length < 3) {
      return "Must be at least 3 characters.";
    }
    return "";
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(validate(newValue));
  };

  const handleBlur = () => {
    setError(validate(value));
  };

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
