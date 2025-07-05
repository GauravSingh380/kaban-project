import { X } from 'lucide-react';

const AddBugModal = ({ isOpen, onClose, newBug, setNewBug, filterOptions, onSubmit }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden transition-all transform">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full 
           max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Bug</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={newBug.title}
                                    onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter bug title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea
                                    value={newBug.description}
                                    onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Describe the bug"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                                    <select
                                        value={newBug.priority}
                                        onChange={(e) => setNewBug({ ...newBug, priority: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select Priority</option>
                                        {filterOptions.priorities.map(priority => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                                    <select
                                        value={newBug.status}
                                        onChange={(e) => setNewBug({ ...newBug, status: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select Status</option>
                                        {filterOptions.statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reported By *</label>
                                    <input
                                        type="text"
                                        value={newBug.reportedBy}
                                        onChange={(e) => setNewBug({ ...newBug, reportedBy: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Reporter name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To *</label>
                                    <input
                                        type="text"
                                        value={newBug.assignedTo}
                                        onChange={(e) => setNewBug({ ...newBug, assignedTo: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Assignee name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.environments.map(env => (
                                        <label key={env} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={newBug.issueEnv.includes(env)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setNewBug({ ...newBug, issueEnv: [...newBug.issueEnv, env] });
                                                    } else {
                                                        setNewBug({ ...newBug, issueEnv: newBug.issueEnv.filter(e => e !== env) });
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{env}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                                <textarea
                                    value={newBug.comments}
                                    onChange={(e) => setNewBug({ ...newBug, comments: e.target.value })}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Additional comments"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={onSubmit}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Add Bug
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AddBugModal;