
// RenderHtmlFields.js - Dynamic Form Field Renderer
import React, { useState } from 'react';
import { 
  Calendar, DollarSign, Users, Tag, Plus, Trash2, X, 
  AlertCircle, TrendingUp, Target, TrendingDown 
} from 'lucide-react';
import SearchableTeamMember from './SearchableTeamMember';

const RenderHtmlFieldsP = ({ fieldItems, formData, handleInputChange, gridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }) => {
  const [newMember, setNewMember] = useState({ name: '', role: '', avatar: '' });
  const [newTag, setNewTag] = useState('');

  const renderField = (field) => {
    const { name, type, label, placeholder, required, options, icon, min, max, step, rows } = field;
    const value = formData[name] || (type === 'array' ? [] : type === 'number' ? 0 : '');

    const baseClasses = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";
    const iconClasses = icon ? "pl-10" : "pl-3";

    const IconComponent = icon === 'Calendar' ? Calendar :
                         icon === 'DollarSign' ? DollarSign :
                         icon === 'Users' ? Users :
                         icon === 'Tag' ? Tag :
                         icon === 'AlertCircle' ? AlertCircle :
                         icon === 'TrendingUp' ? TrendingUp :
                         icon === 'Target' ? Target :
                         icon === 'TrendingDown' ? TrendingDown : null;
    const roles = [
      { value: "Project Manager", label: "Project Manager" },
      { value: "Frontend Developer", label: "Frontend Developer" },
      { value: "Backend Developer", label: "Backend Developer" },
      { value: "UI/UX Designer", label: "UI/UX Designer" },
      { value: "QA Engineer", label: "QA Engineer" },
      { value: "DevOps Engineer", label: "DevOps Engineer" },
      { value: "Business Analyst", label: "Business Analyst" },
    ];

    switch (type) {
      case 'text':
      case 'email':
        return (
          <div className="relative">
            {IconComponent && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconComponent className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <input
              type={type}
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              className={`${baseClasses} ${iconClasses}`}
              required={required}
            />
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            rows={rows || 3}
            className={baseClasses}
            required={required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className={baseClasses}
            required={required}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <div className="relative">
            {IconComponent && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconComponent className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(name, Number(e.target.value))}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              className={`${baseClasses} ${iconClasses}`}
              required={required}
            />
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              min={min}
              max={max}
              className={`${baseClasses} pl-10`}
              required={required}
            />
          </div>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value}
              onChange={(e) => handleInputChange(name, Number(e.target.value))}
              min={min || 0}
              max={max || 100}
              step={step || 1}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{min || 0}%</span>
              <span className="font-medium text-blue-600">{value}%</span>
              <span>{max || 100}%</span>
            </div>
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-2">
            {/* Display existing tags */}
            {value.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {value.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = value.filter((_, i) => i !== index);
                        handleInputChange(name, newTags);
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Add new tag */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={placeholder || "Add a tag"}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    if (newTag.trim() && !value.includes(newTag.trim())) {
                      handleInputChange(name, [...value, newTag.trim()]);
                      setNewTag('');
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (newTag.trim() && !value.includes(newTag.trim())) {
                    handleInputChange(name, [...value, newTag.trim()]);
                    setNewTag('');
                  }
                }}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-3">
            {/* Display existing team members */}
            {value.length > 0 && (
              <div className="space-y-2">
                {value.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newTeam = value.filter((_, i) => i !== index);
                        handleInputChange(name, newTeam);
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new team member */}
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Member Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {/* <input
                  type="text"
                  placeholder="Role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                /> */}
                <select
                  value={newMember.role}
                  // onChange={(e) => setMemberRole(e.target.value)}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  // disabled={disabled}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select role</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (newMember.name && newMember.role) {
                      const avatar = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
                      handleInputChange(name, [...value, { ...newMember, avatar }]);
                      setNewMember({ name: '', role: '', avatar: '' });
                    }
                  }}
                  disabled={!newMember.name || !newMember.role}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      case 'team-member-search':
          return (
            <SearchableTeamMember
              value={formData[field.name] || []}
              handleInputChange={handleInputChange}
              name={field.name}
              roles={field.roles}
            />
          );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(name, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">{label}</label>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className={baseClasses}
            required={required}
          />
        );
    }
  };

  return (
    <div className={gridClasses}>
      {fieldItems.map((field, index) => (
        <div key={field.name || index} className={field.containerClass || ""}>
          {field.type !== 'checkbox' && field.label && (
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {renderField(field)}
          {field.error && (
            <p className="mt-1 text-sm text-red-600">{field.error}</p>
          )}
          {field.helpText && (
            <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderHtmlFieldsP;