import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Code, Save, Settings } from 'lucide-react';

const FormBuilder = () => {
    const [formConfig, setFormConfig] = useState({
        title: 'Dynamic Form',
        description: 'Form with conditional logic',
        fields: []
    });

    const [activeTab, setActiveTab] = useState('builder');
    const [previewData, setPreviewData] = useState({});
    const [savedForms, setSavedForms] = useState([]);

    // Field types with their configurations
    const fieldTypes = {
        text: { label: 'Text Input', icon: '📝', hasOptions: false },
        email: { label: 'Email', icon: '📧', hasOptions: false },
        number: { label: 'Number', icon: '🔢', hasOptions: false },
        select: { label: 'Dropdown', icon: '📋', hasOptions: true },
        radio: { label: 'Radio Button', icon: '⚪', hasOptions: true },
        checkbox: { label: 'Checkbox', icon: '☑️', hasOptions: true },
        textarea: { label: 'Text Area', icon: '📄', hasOptions: false },
        date: { label: 'Date', icon: '📅', hasOptions: false },
        file: { label: 'File Upload', icon: '📎', hasOptions: false }
    };

    // Condition operators
    const operators = {
        equals: 'equals',
        notEquals: 'not equals',
        contains: 'contains',
        greaterThan: 'greater than',
        lessThan: 'less than',
        isEmpty: 'is empty',
        isNotEmpty: 'is not empty'
    };

    // Add new field
    const addField = (type) => {
        const newField = {
            id: `field_${Date.now()}`,
            type,
            label: `New ${fieldTypes[type].label}`,
            name: `field_${formConfig.fields.length + 1}`,
            required: false,
            placeholder: '',
            options: fieldTypes[type].hasOptions ? ['Option 1', 'Option 2'] : [],
            conditions: [],
            validations: {
                minLength: '',
                maxLength: '',
                pattern: '',
                min: '',
                max: ''
            }
        };

        setFormConfig(prev => ({
            ...prev,
            fields: [...prev.fields, newField]
        }));
    };

    // Update field property
    const updateField = (fieldId, property, value) => {
        setFormConfig(prev => ({
            ...prev,
            fields: prev.fields.map(field =>
                field.id === fieldId ? { ...field, [property]: value } : field
            )
        }));
    };

    // Add condition to field
    const addCondition = (fieldId) => {
        const newCondition = {
            id: `condition_${Date.now()}`,
            fieldId: formConfig.fields[0]?.id || '',
            operator: 'equals',
            value: '',
            action: 'show' // show or hide
        };

        updateField(fieldId, 'conditions', [
            ...(formConfig.fields.find(f => f.id === fieldId)?.conditions || []),
            newCondition
        ]);
    };

    // Update condition
    const updateCondition = (fieldId, conditionId, property, value) => {
        const field = formConfig.fields.find(f => f.id === fieldId);
        const updatedConditions = field.conditions.map(condition =>
            condition.id === conditionId ? { ...condition, [property]: value } : condition
        );
        updateField(fieldId, 'conditions', updatedConditions);
    };

    // Remove field
    const removeField = (fieldId) => {
        setFormConfig(prev => ({
            ...prev,
            fields: prev.fields.filter(field => field.id !== fieldId)
        }));
    };

    // Check if field should be visible based on conditions
    const isFieldVisible = (field) => {
        if (!field.conditions || field.conditions.length === 0) return true;

        return field.conditions.every(condition => {
            const sourceField = formConfig.fields.find(f => f.id === condition.fieldId);
            if (!sourceField) return true;

            const sourceValue = previewData[sourceField.name] || '';
            const conditionValue = condition.value;

            let conditionMet = false;

            switch (condition.operator) {
                case 'equals':
                    conditionMet = sourceValue === conditionValue;
                    break;
                case 'notEquals':
                    conditionMet = sourceValue !== conditionValue;
                    break;
                case 'contains':
                    conditionMet = sourceValue.toString().toLowerCase().includes(conditionValue.toLowerCase());
                    break;
                case 'greaterThan':
                    conditionMet = parseFloat(sourceValue) > parseFloat(conditionValue);
                    break;
                case 'lessThan':
                    conditionMet = parseFloat(sourceValue) < parseFloat(conditionValue);
                    break;
                case 'isEmpty':
                    conditionMet = !sourceValue || sourceValue === '';
                    break;
                case 'isNotEmpty':
                    conditionMet = sourceValue && sourceValue !== '';
                    break;
                default:
                    conditionMet = true;
            }

            return condition.action === 'show' ? conditionMet : !conditionMet;
        });
    };

    // Handle preview form input
    const handlePreviewChange = (fieldName, value) => {
        setPreviewData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    // Save form configuration
    const saveForm = () => {
        const formToSave = {
            ...formConfig,
            id: `form_${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        setSavedForms(prev => [...prev, formToSave]);
        alert('Form saved successfully!');
    };

    // Load saved form
    const loadForm = (savedForm) => {
        setFormConfig(savedForm);
        setPreviewData({});
    };

    // Render form field in preview
    const renderPreviewField = (field) => {
        if (!isFieldVisible(field)) return null;

        const commonProps = {
            id: field.name,
            name: field.name,
            required: field.required,
            placeholder: field.placeholder,
            className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        };

        switch (field.type) {
            case 'text':
            case 'email':
                return (
                    <input
                        {...commonProps}
                        type={field.type}
                        value={previewData[field.name] || ''}
                        onChange={(e) => handlePreviewChange(field.name, e.target.value)}
                    />
                );

            case 'number':
                return (
                    <input
                        {...commonProps}
                        type="number"
                        min={field.validations.min}
                        max={field.validations.max}
                        value={previewData[field.name] || ''}
                        onChange={(e) => handlePreviewChange(field.name, e.target.value)}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        rows={4}
                        value={previewData[field.name] || ''}
                        onChange={(e) => handlePreviewChange(field.name, e.target.value)}
                    />
                );

            case 'select':
                return (
                    <select
                        {...commonProps}
                        value={previewData[field.name] || ''}
                        onChange={(e) => handlePreviewChange(field.name, e.target.value)}
                    >
                        <option value="">Select an option</option>
                        {field.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options.map((option, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option}
                                    checked={previewData[field.name] === option}
                                    onChange={(e) => handlePreviewChange(field.name, e.target.value)}
                                    className="text-blue-600"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'checkbox':
                return (
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
                                            : currentValues.filter(v => v !== option);
                                        handlePreviewChange(field.name, newValues);
                                    }}
                                    className="text-blue-600"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'date':
                return (
                    <input
                        {...commonProps}
                        type="date"
                        value={previewData[field.name] || ''}
                        onChange={(e) => handlePreviewChange(field.name, e.target.value)}
                    />
                );

            case 'file':
                return (
                    <input
                        {...commonProps}
                        type="file"
                        onChange={(e) => handlePreviewChange(field.name, e.target.files[0]?.name || '')}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Advanced Form Builder</h1>
                            <p className="text-gray-600 mt-2">Create dynamic forms with conditional logic</p>
                        </div>
                        <button
                            onClick={saveForm}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Form</span>
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            { id: 'builder', label: 'Form Builder', icon: Settings },
                            { id: 'preview', label: 'Preview', icon: Eye },
                            { id: 'code', label: 'Export Code', icon: Code }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'builder' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Field Types Panel */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Field Types</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(fieldTypes).map(([type, config]) => (
                                        <button
                                            key={type}
                                            onClick={() => addField(type)}
                                            className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left transition-colors"
                                        >
                                            <span className="text-lg">{config.icon}</span>
                                            <span className="font-medium">{config.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Saved Forms */}
                                {savedForms.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Saved Forms</h3>
                                        <div className="space-y-2">
                                            {savedForms.map((form) => (
                                                <button
                                                    key={form.id}
                                                    onClick={() => loadForm(form)}
                                                    className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                                                >
                                                    <div className="font-medium">{form.title}</div>
                                                    <div className="text-sm text-gray-500">{form.fields.length} fields</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Configuration */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Form Settings */}
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                                            <input
                                                type="text"
                                                value={formConfig.title}
                                                onChange={(e) => setFormConfig(prev => ({ ...prev, title: e.target.value }))}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                value={formConfig.description}
                                                onChange={(e) => setFormConfig(prev => ({ ...prev, description: e.target.value }))}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Fields List */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Form Fields</h3>
                                    {formConfig.fields.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            <Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                            <p>No fields added yet. Click on a field type to get started.</p>
                                        </div>
                                    ) : (
                                        formConfig.fields.map((field, index) => (
                                            <div key={field.id} className="border border-gray-300 rounded-md p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-lg">{fieldTypes[field.type].icon}</span>
                                                        <span className="font-medium">{fieldTypes[field.type].label}</span>
                                                        <span className="text-sm text-gray-500">#{index + 1}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeField(field.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                                        <input
                                                            type="text"
                                                            value={field.label}
                                                            onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            value={field.name}
                                                            onChange={(e) => updateField(field.id, 'name', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                                                        <input
                                                            type="text"
                                                            value={field.placeholder}
                                                            onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={field.required}
                                                                onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                                                                className="text-blue-600"
                                                            />
                                                            <span className="text-sm font-medium text-gray-700">Required</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Options for select, radio, checkbox */}
                                                {fieldTypes[field.type].hasOptions && (
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                                                        <div className="space-y-2">
                                                            {field.options.map((option, optionIndex) => (
                                                                <div key={optionIndex} className="flex items-center space-x-2">
                                                                    <input
                                                                        type="text"
                                                                        value={option}
                                                                        onChange={(e) => {
                                                                            const newOptions = [...field.options];
                                                                            newOptions[optionIndex] = e.target.value;
                                                                            updateField(field.id, 'options', newOptions);
                                                                        }}
                                                                        className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            const newOptions = field.options.filter((_, i) => i !== optionIndex);
                                                                            updateField(field.id, 'options', newOptions);
                                                                        }}
                                                                        className="text-red-600 hover:text-red-800"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => updateField(field.id, 'options', [...field.options, `Option ${field.options.length + 1}`])}
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            >
                                                                + Add Option
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Conditional Logic */}
                                                <div className="border-t pt-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-sm font-medium text-gray-700">Conditional Logic</h4>
                                                        <button
                                                            onClick={() => addCondition(field.id)}
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            disabled={formConfig.fields.length <= 1}
                                                        >
                                                            + Add Condition
                                                        </button>
                                                    </div>

                                                    {field.conditions?.map((condition) => (
                                                        <div key={condition.id} className="bg-gray-50 p-3 rounded-md mb-2">
                                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                                                                <select
                                                                    value={condition.action}
                                                                    onChange={(e) => updateCondition(field.id, condition.id, 'action', e.target.value)}
                                                                    className="p-1 border border-gray-300 rounded"
                                                                >
                                                                    <option value="show">Show</option>
                                                                    <option value="hide">Hide</option>
                                                                </select>

                                                                <select
                                                                    value={condition.fieldId}
                                                                    onChange={(e) => updateCondition(field.id, condition.id, 'fieldId', e.target.value)}
                                                                    className="p-1 border border-gray-300 rounded"
                                                                >
                                                                    <option value="">Select field</option>
                                                                    {formConfig.fields
                                                                        .filter(f => f.id !== field.id)
                                                                        .map(f => (
                                                                            <option key={f.id} value={f.id}>{f.label}</option>
                                                                        ))}
                                                                </select>

                                                                <select
                                                                    value={condition.operator}
                                                                    onChange={(e) => updateCondition(field.id, condition.id, 'operator', e.target.value)}
                                                                    className="p-1 border border-gray-300 rounded"
                                                                >
                                                                    {Object.entries(operators).map(([key, label]) => (
                                                                        <option key={key} value={key}>{label}</option>
                                                                    ))}
                                                                </select>

                                                                <div className="flex items-center space-x-2">
                                                                    <input
                                                                        type="text"
                                                                        value={condition.value}
                                                                        onChange={(e) => updateCondition(field.id, condition.id, 'value', e.target.value)}
                                                                        placeholder="Value"
                                                                        className="flex-1 p-1 border border-gray-300 rounded"
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            const updatedConditions = field.conditions.filter(c => c.id !== condition.id);
                                                                            updateField(field.id, 'conditions', updatedConditions);
                                                                        }}
                                                                        className="text-red-600 hover:text-red-800"
                                                                    >
                                                                        <Trash2 className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preview' && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white border border-gray-300 rounded-lg p-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">{formConfig.title}</h2>
                                    <p className="text-gray-600 mt-2">{formConfig.description}</p>
                                </div>

                                <div className="space-y-6">
                                    {formConfig.fields.map((field) => (
                                        <div key={field.id} className={isFieldVisible(field) ? 'block' : 'hidden'}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            {renderPreviewField(field)}
                                        </div>
                                    ))}

                                    <div className="pt-4">
                                        <button
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log('Form Data:', previewData);
                                                alert('Form submitted! Check console for data.');
                                            }}
                                        >
                                            Submit Form
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Form Data Debug */}
                            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Form Data:</h3>
                                <pre className="text-xs text-gray-600 overflow-auto">
                                    {JSON.stringify(previewData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'code' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Configuration (JSON)</h3>
                                <div className="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                                    <pre className="text-sm">
                                        {JSON.stringify(formConfig, null, 2)}
                                    </pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">React Component Code</h3>
                                <div className="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                                    <pre className="text-sm">
                                        {`// Generated Form Component
                                            import React, { useState } from 'react';

                                            const GeneratedForm = () => {
                                            const [formData, setFormData] = useState({});
                                            
                                            const handleChange = (name, value) => {
                                                setFormData(prev => ({ ...prev, [name]: value }));
                                            };
                                            
                                            const handleSubmit = (e) => {
                                                e.preventDefault();
                                                console.log('Form submitted:', formData);
                                            };
                                            
                                            return (
                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                <h2 className="text-2xl font-bold">${formConfig.title}</h2>
                                                <p className="text-gray-600">${formConfig.description}</p>
                                                
                                                ${formConfig.fields.map(field => `
                                                <div className="space-y-2">
                                                    <label className="block font-medium">
                                                    ${field.label}${field.required ? ' *' : ''}
                                                    </label>
                                                    {/* Field implementation based on type: ${field.type} */}
                                                </div>`).join('')}
                                                
                                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                                    Submit
                                                </button>
                                                </form>
                                            );
                                            };

                                            export default GeneratedForm;`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormBuilder;