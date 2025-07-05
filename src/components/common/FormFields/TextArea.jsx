import React from 'react'

const TextArea = ({ input, onChange, label, mandatory = false }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label || ""}
                <span className='text-red-700'>{mandatory ? "*" : ""}</span>
            </label>
            <textarea
                name={input.name}
                value={input}
                // onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                onChange={onChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the bug"
            />
        </div>
    )
}

export default TextArea