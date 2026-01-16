import { useState } from "react";
import { validateCSVContent } from '../../../utils/validateCsv';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { X } from 'lucide-react';

const ImportBugModal = ({ isOpen, onClose, onSubmit, loadingCreateBug }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setShowPreview(false);
            setPreviewData([]);
        }
    };

    const handleFilePreview = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        try {
            const fileName = selectedFile.name;
            const isCSV = fileName.endsWith('.csv');
            const isXLSX = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

            let parsedData = [];
            let headers = [];

            // ✅ Handle CSV files
            if (isCSV) {
                const text = await selectedFile.text();
                const { data, errors, meta } = Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    transformHeader: header => header.trim(),
                    transform: value => value.trim()
                });

                if (errors.length > 0) {
                    setErrorMsg(`CSV parsing error: ${errors[0].message}`);
                    setTimeout(() => setErrorMsg(''), 10000);
                    return;
                }

                parsedData = data;
                headers = meta.fields;
            }

            // ✅ Handle XLSX files
            else if (isXLSX) {
                const buffer = await selectedFile.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                parsedData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                headers = Object.keys(parsedData[0] || {});
            }

            else {
                setErrorMsg('Unsupported file type. Please upload .csv or .xlsx files only.');
                setTimeout(() => setErrorMsg(''), 10000);
                return;
            }

            // ✅ Validate data
            const validationResult = validateCSVContent(headers, parsedData);
            if (!validationResult.isValid) {
                setErrorMsg(validationResult.message);
                setTimeout(() => setErrorMsg(''), 10000);
                return;
            }
            setErrorMsg('');

            // ✅ Process and normalize data
            const today = new Date().toISOString().split('T')[0];
            const processedData = parsedData.map((bug, index) => {
                return {
                    ...bug,
                    id: bug.id || Date.now() + index,
                    slNo: bug.slNo || 1000 + index,
                    priority: bug.priority || 'P3',
                    status: bug.status || 'open',
                    reportedBy: bug.reportedBy || 'Unknown',
                    assignedTo: bug.assignedTo || 'Unassigned',
                    comments: bug.comments || '',
                    issueEnv: Array.isArray(bug.issueEnv)
                        ? bug.issueEnv
                        : (bug.issueEnv || '').split(',').map(e => e.trim()).filter(Boolean),
                    reportedOn: bug.reportedOn || today,
                    createdAt: bug.createdAt || today,
                    updatedAt: bug.updatedAt || today
                };
            });

            setPreviewData(processedData);
            setShowPreview(true);
        } catch (error) {
            alert('Error processing file: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        if (previewData.length === 0) {
            alert('Please select and preview a file first');
            return;
        }

        onSubmit(previewData);

        // Reset modal state
        setSelectedFile(null);
        setPreviewData([]);
        setShowPreview(false);
        onClose();
    };

    const handleClose = () => {
        setSelectedFile(null);
        setPreviewData([]);
        setShowPreview(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Import Bugs</h3>
                            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {errorMsg && (
                            <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
                                {errorMsg}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select CSV File
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        accept=".csv, .xlsx, .xls"
                                        onChange={handleFileSelect}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {selectedFile && (
                                        <button
                                            onClick={handleFilePreview}
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {isLoading ? 'Loading...' : 'Preview'}
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    CSV should contain columns: title, description, priority, status, reportedBy, assignedTo, issueEnv, comments
                                </p>
                            </div>

                            {showPreview && previewData.length > 0 && (
                                <div className="border border-gray-200 rounded-md p-4 max-h-96 overflow-y-auto">
                                    <h4 className="font-medium text-gray-900 mb-3">
                                        Preview ({previewData.length} bugs found)
                                    </h4>
                                    <div className="space-y-2">
                                        {previewData.slice(0, 5).map((bug, index) => (
                                            <div key={index} className="p-3 bg-gray-50 rounded border text-sm">
                                                <div className="font-medium">{bug.title}</div>
                                                <div className="text-gray-600">
                                                    Priority: {bug.priority} | Status: {bug.status} |
                                                    Reported by: {bug.reportedBy} | Assigned to: {bug.assignedTo}
                                                </div>
                                                {bug.issueEnv && bug.issueEnv.length > 0 && (
                                                    <div className="text-gray-600">
                                                        Environment: {Array.isArray(bug.issueEnv) ? bug.issueEnv.join(', ') : bug.issueEnv}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {previewData.length > 5 && (
                                            <div className="text-center text-gray-500 text-sm">
                                                ... and {previewData.length - 5} more bugs
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {loadingCreateBug ?
                            <StyledSpinner
                                borderWidth='3px'
                                size='1.5rem'
                                text='Importing...'
                                fontSize='semi bold'
                            />
                            : <button
                                onClick={handleSubmit}
                                disabled={!showPreview || previewData.length === 0}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Import {previewData.length} Bug{previewData.length !== 1 ? 's' : ''}
                            </button>}
                        <button
                            onClick={handleClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportBugModal;