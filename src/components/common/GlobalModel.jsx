import { X } from 'lucide-react';

const GlobalModel = ({ isOpen, onClose, onSubmit, children, header = 'Add Model', submitText="Add" }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-white rounded-lg text-left overflow-hidden w-full">
                    {/* Header */}
                    <div className="px-4 pt-5 pb-2 sm:px-6 sm:pt-6 sm:pb-2 border-b bg-[#f1e7f7]  border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{header}</h3>
                            <button 
                                onClick={onClose} 
                                className="text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="px-4 py-5 sm:p-6 max-h-[60vh] overflow-y-auto">
                        {children}
                    </div>

                    {/* Footer */}
                    <div className="bg-[#f1e7f7] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                        <button
                            onClick={onSubmit}
                            className="w-full cursor-pointer inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            {submitText}
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-3 w-full inline-flex cursor-pointer justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default GlobalModel;