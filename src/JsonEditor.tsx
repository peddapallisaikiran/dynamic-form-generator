// src/components/JsonEditor.tsx
import React, { useState } from 'react';

interface JsonEditorProps {
  onChange: (json: any) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange }) => {
  const [jsonString, setJsonString] = useState<string>('{"fields": []}');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJsonString(value);
    try {
      const json = JSON.parse(value);
      onChange(json);
    } catch (error) {
      console.error("Invalid JSON", error);
    }
  };

  return (
    <textarea
      className="w-full h-full p-4 border border-gray-300"
      value={jsonString}
      onChange={handleChange}
      placeholder="Enter JSON schema here..."
    />
  );
};

export default JsonEditor;