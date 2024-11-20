// src/App.tsx
import React, { useState } from 'react';
import JsonEditor from './JsonEditor';
import FormGenerator from './FormGenerator';

const App: React.FC = () => {
  const [schema, setSchema] = useState<any>({ fields: [] });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    alert('Copied to clipboard!');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Dynamic Form Generator Challenge</h2>
        <JsonEditor onChange={setSchema} />
        <button onClick={copyToClipboard} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Copy Form JSON</button>
      </div>
      <div className="md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Generated Form</h2>
        <FormGenerator schema={schema} />
      </div>
    </div>
  );
};

export default App;