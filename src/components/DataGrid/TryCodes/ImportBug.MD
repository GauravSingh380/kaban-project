// Add this import at the top with other imports
import { Upload } from 'lucide-react';

// Add this ImportBugModal component after the AddBugModal component
const ImportBugModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

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
      const text = await selectedFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        alert('File is empty');
        return;
      }

      // Parse CSV
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const data = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const bug = {};
        
        headers.forEach((header, i) => {
          bug[header] = values[i] || '';
        });

        // Generate IDs if not present
        if (!bug.id) bug.id = Date.now() + index;
        if (!bug.slNo) bug.slNo = 1000 + index;
        
        // Parse environment array
        if (bug.issueEnv && typeof bug.issueEnv === 'string') {
          bug.issueEnv = bug.issueEnv.split(',').map(env => env.trim()).filter(env => env);
        } else if (!bug.issueEnv) {
          bug.issueEnv = [];
        }

        // Set default dates if not present
        const today = new Date().toISOString().split('T')[0];
        if (!bug.reportedOn) bug.reportedOn = today;
        if (!bug.createdAt) bug.createdAt = today;
        if (!bug.updatedAt) bug.updatedAt = today;

        return bug;
      });

      setPreviewData(data);
      setShowPreview(true);
    } catch (error) {
      alert('Error reading file: ' + error.message);
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Import Bugs</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select CSV File
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept=".csv"
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
            <button
              onClick={handleSubmit}
              disabled={!showPreview || previewData.length === 0}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import {previewData.length} Bug{previewData.length !== 1 ? 's' : ''}
            </button>
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

// Add this state variable with other useState declarations in BugManagementSystem component
const [isImportModalOpen, setIsImportModalOpen] = useState(false);

// Add this function with other handlers in BugManagementSystem component
const handleImportBugs = (importedBugs) => {
  // Generate unique IDs and serial numbers
  const maxId = Math.max(...originalData.map(b => b.id), 0);
  const maxSlNo = Math.max(...originalData.map(b => b.slNo), 0);
  
  const processedBugs = importedBugs.map((bug, index) => ({
    ...bug,
    id: maxId + index + 1,
    slNo: maxSlNo + index + 1,
    // Ensure all required fields have values
    title: bug.title || 'Untitled Bug',
    description: bug.description || 'No description provided',
    priority: bug.priority || 'P3',
    status: bug.status || 'open',
    reportedBy: bug.reportedBy || 'Unknown',
    assignedTo: bug.assignedTo || 'Unassigned',
    issueEnv: Array.isArray(bug.issueEnv) ? bug.issueEnv : (bug.issueEnv ? [bug.issueEnv] : []),
    comments: bug.comments || '',
    reportedOn: bug.reportedOn || new Date().toISOString().split('T')[0],
    createdAt: bug.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: bug.updatedAt || new Date().toISOString().split('T')[0]
  }));

  // Add to existing data
  setOriginalData(prev => [...prev, ...processedBugs]);
  alert(`Successfully imported ${processedBugs.length} bugs!`);
};

// Replace the existing Export button section in the header with this:
<div className="mt-4 sm:mt-0 flex items-center space-x-3">
  <button
    onClick={() => setIsImportModalOpen(true)}
    className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
  >
    <Upload className="w-4 h-4" />
    <span>Import</span>
  </button>
  <button
    onClick={exportData}
    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
  >
    <Download className="w-4 h-4" />
    <span>Export ({selectedRows.length > 0 ? selectedRows.length : sortedData.length})</span>
  </button>
  <button
    onClick={() => setIsAddModalOpen(true)}
    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    <Plus className="w-4 h-4" />
    <span>Add Bug</span>
  </button>
</div>

// Add this just before the closing div and after the AddBugModal
<ImportBugModal
  isOpen={isImportModalOpen}
  onClose={() => setIsImportModalOpen(false)}
  onSubmit={handleImportBugs}
/>