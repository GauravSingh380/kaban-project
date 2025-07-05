import React from 'react';

const RenderHtmlFields = ({ fieldItems, previewData, handleInputChange }) => {
  return (
    <>
      {fieldItems.map((field) => {
        const commonProps = {
          id: field.name,
          name: field.name,
          required: field.required,
          placeholder: field.placeholder,
          className:
            'w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        };

        switch (field.type) {
          case 'text':
          case 'email':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  {...commonProps}
                  type={field.type}
                  value={previewData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                />
              </div>
            );

          case 'number':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  {...commonProps}
                  type="number"
                  min={field.validations.min || undefined}
                  max={field.validations.max || undefined}
                  value={previewData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                />
              </div>
            );

          case 'textarea':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.name}>{field.label}</label>
                <textarea
                  {...commonProps}
                  rows={4}
                  value={previewData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                />
              </div>
            );

          case 'select':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.name}>{field.label}</label>
                <select
                  {...commonProps}
                  value={previewData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );

          case 'radio':
            return (
              <div key={field.id} className="mb-4">
                <label>{field.label}</label>
                <div className="space-y-2">
                  {field.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={previewData[field.name] === option}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            );

          case 'checkbox':
            return (
              <div key={field.id} className="mb-4">
                <label>{field.label}</label>
                <div className="space-y-2">
                  {field.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={option}
                        checked={(previewData[field.name] || []).includes(option)}
                        onChange={(e) => {
                          const currentValues = previewData[field.name] || [];
                          const newValues = e.target.checked
                            ? [...currentValues, option]
                            : currentValues.filter((v) => v !== option);
                          handleInputChange(field.name, newValues);
                        }}
                        className="text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            );

          case 'date':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  {...commonProps}
                  type="date"
                  value={previewData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                />
              </div>
            );

          case 'file':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  {...commonProps}
                  type="file"
                  onChange={(e) => handleInputChange(field.name, e.target.files[0]?.name || '')}
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default RenderHtmlFields;
