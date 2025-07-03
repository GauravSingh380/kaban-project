import { UserCheck } from 'lucide-react'
import React from 'react'

const Select = () => {
    return (
        <div>
            <label className="block text-purple-900 text-sm font-medium mb-2">
                Role
            </label>
            <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                >
                    {roles.map(role => (
                        <option key={role.value} value={role.value} className="bg-purple-800 text-black">
                            {role.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Select