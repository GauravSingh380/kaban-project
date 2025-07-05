import React from 'react'

const TextInput = ({ input, onChange, label, mandatory = false }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label || ""}
                <span className='text-red-700'>{mandatory ? "*" : ""}</span>
            </label>
            <input
                type="text"
                name={input.name}
                value={input}
                // onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter bug title"
            />
        </div>
    )
}

export default TextInput