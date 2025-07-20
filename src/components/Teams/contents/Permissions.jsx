import React from 'react'

const Permissions = () => {
    const roleOptions = [
        { value: 'all', label: 'All Roles' },
        { value: 'Project Manager', label: 'Project Manager' },
        { value: 'Senior Developer', label: 'Senior Developer' },
        { value: 'Lead Developer', label: 'Lead Developer' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Security Expert', label: 'Security Expert' },
        { value: 'QA Engineer', label: 'QA Engineer' }
    ];
    
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
            <div className="space-y-4">
                {roleOptions.filter(role => role.value !== 'all').map(role => (
                    <div key={role.value} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{role.label}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">View Projects</span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">Edit Tasks</span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">View Reports</span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">Manage Team</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Permissions