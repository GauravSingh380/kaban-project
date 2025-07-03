import React from 'react'

const Input = () => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
                type="text"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
        </div>
    )
}

export default Input