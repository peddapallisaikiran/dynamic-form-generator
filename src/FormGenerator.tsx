// src/components/FormGenerator.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FormGeneratorProps {
  schema: { fields: Field[] };
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    
    // Download submission as JSON
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submission.json';
    document.body.appendChild(a);
    a.click();
    
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {schema.fields.map(field => (
        <div key={field.id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === 'select' ? (
            <select {...register(field.id, { required: field.required })} className="mt-1 block w-full border rounded-md shadow-sm">
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            field.options?.map(option => (
              <div key={option.value}>
                <label>
                  <input type="radio" {...register(field.id, { required: field.required })} value={option.value} />
                  {option.label}
                </label>
              </div>
            ))
          ) : (
            <input
              {...register(field.id, { required: field.required })}
              type={field.type}
              placeholder={field.placeholder}
              className={`mt-1 block w-full border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
            />
          )}
          {errors[field.id] && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default FormGenerator;