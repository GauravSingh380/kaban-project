import React from 'react';

const RenderHtmlFields = ({ fieldItems, previewData, handleInputChange }) => {
  // Group fields by their alignment/grid configuration
  const groupFields = () => {
    const groups = [];
    let currentGroup = [];
    let currentGridClass = null;

    fieldItems.forEach((field, index) => {
      const fieldGridClass = field.alignment || 'w-full';
      
      // If this field has a different grid class or we're starting fresh
      if (currentGridClass !== fieldGridClass || currentGroup.length === 0) {
        // Save previous group if it exists
        if (currentGroup.length > 0) {
          groups.push({
            gridClass: currentGridClass,
            fields: currentGroup
          });
        }
        
        // Start new group
        currentGroup = [field];
        currentGridClass = fieldGridClass;
      } else {
        // Add to current group
        currentGroup.push(field);
      }
      
      // If this is the last field, save the group
      if (index === fieldItems.length - 1) {
        groups.push({
          gridClass: currentGridClass,
          fields: currentGroup
        });
      }
    });

    return groups;
  };

  const renderField = (field) => {
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
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
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
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              {...commonProps}
              type="number"
              min={field.validations?.min || undefined}
              max={field.validations?.max || undefined}
              value={previewData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
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
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              {...commonProps}
              value={previewData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            >
              <option value="">Select an option</option>
              {field.options?.map((option, index) => (
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="flex flex-wrap gap-2">
              {field.options?.map((option, index) => (
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
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
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
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
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
  };

  const fieldGroups = groupFields();

  return (
    <>
      {fieldGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={group.gridClass}>
          {group.fields.map((field) => renderField(field))}
        </div>
      ))}
    </>
  );
};

export default RenderHtmlFields;