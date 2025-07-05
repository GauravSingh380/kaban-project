import React from 'react'

const SelectInput = ({ input, onChange, label, mandatory = false }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label || ""}
                <span className='text-red-700'>{mandatory ? "*" : ""}</span>
            </label>
            <select
                value={newBug.priority}
                name={input.name}
                // onChange={(e) => setNewBug({ ...newBug, priority: e.target.value })}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="">Select Priority</option>
                {input.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput