import React from 'react';
import * as XLSX from 'xlsx';

const BugImportSampleGenerator = () => {
  const sampleBugs = [
    {
      title: 'Login page not loading on Safari',
      description: 'Users are unable to access the login page when using Safari browser. The page shows a blank screen after clicking the login button.',
      priority: 'P1',
      status: 'open',
      reportedBy: 'John Doe',
      assignedTo: 'Jane Smith',
      issueEnv: 'Production',
      comments: 'Urgent - affecting multiple users',
      reportedOn: '2024-01-15',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      title: 'Payment gateway timeout error',
      description: 'Payment transactions are timing out after 30 seconds, causing failed transactions and user frustration.',
      priority: 'P2',
      status: 'open',
      reportedBy: 'Mike Johnson',
      assignedTo: 'Sarah Lee',
      issueEnv: 'Production',
      comments: 'Multiple customer complaints received',
      reportedOn: '2024-01-16',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    },
    {
      title: 'Dashboard charts not rendering correctly',
      description: 'Bar charts on the analytics dashboard are displaying incorrect data values and overlapping labels.',
      priority: 'P3',
      status: 'in-progress',
      reportedBy: 'Emily Davis',
      assignedTo: 'Tom Wilson',
      issueEnv: 'Staging',
      comments: 'Fix scheduled for next sprint',
      reportedOn: '2024-01-14',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-17'
    },
    {
      title: 'Email notifications not being sent',
      description: 'System is not sending email notifications for password reset requests and account activations.',
      priority: 'P1',
      status: 'open',
      reportedBy: 'Alex Brown',
      assignedTo: 'Lisa Chen',
      issueEnv: 'Production',
      comments: 'SMTP configuration needs review',
      reportedOn: '2024-01-17',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17'
    },
    {
      title: 'Mobile app crashes on Android 12',
      description: 'The mobile application crashes immediately upon launch on devices running Android 12.',
      priority: 'P2',
      status: 'in-progress',
      reportedBy: 'Chris Taylor',
      assignedTo: 'David Martinez',
      issueEnv: 'Production',
      comments: 'Hot fix in development',
      reportedOn: '2024-01-13',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-18'
    },
    {
      title: 'Search functionality returning no results',
      description: 'The search bar is not returning any results even for valid queries. Database connection seems fine.',
      priority: 'P3',
      status: 'open',
      reportedBy: 'Rachel Green',
      assignedTo: 'Robert King',
      issueEnv: 'Development',
      comments: 'Index rebuild may be required',
      reportedOn: '2024-01-18',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18'
    },
    {
      title: 'Profile image upload failing',
      description: 'Users cannot upload profile images larger than 2MB. Error message is not user-friendly.',
      priority: 'P4',
      status: 'open',
      reportedBy: 'Kevin White',
      assignedTo: 'Unassigned',
      issueEnv: 'Staging',
      comments: 'Add file size validation message',
      reportedOn: '2024-01-12',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    },
    {
      title: 'API rate limiting too aggressive',
      description: 'API rate limits are being triggered too frequently, blocking legitimate user requests.',
      priority: 'P1',
      status: 'resolved',
      reportedBy: 'Nancy Adams',
      assignedTo: 'Paul Garcia',
      issueEnv: 'Production',
      comments: 'Rate limit increased from 100 to 500 requests/hour',
      reportedOn: '2024-01-10',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-19'
    },
    {
      title: 'Dark mode styling inconsistencies',
      description: 'Some UI components are not properly styled in dark mode, showing white backgrounds instead of dark.',
      priority: 'P4',
      status: 'open',
      reportedBy: 'Jennifer Lopez',
      assignedTo: 'Mark Anderson',
      issueEnv: 'Development',
      comments: 'CSS theme variables need update',
      reportedOn: '2024-01-19',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-19'
    },
    {
      title: 'Database connection pool exhausted',
      description: 'Application experiencing intermittent 500 errors due to database connection pool being exhausted during peak hours.',
      priority: 'P2',
      status: 'in-progress',
      reportedBy: 'Steven Clark',
      assignedTo: 'Michelle Rodriguez',
      issueEnv: 'Production',
      comments: 'Increasing pool size and adding connection monitoring',
      reportedOn: '2024-01-11',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-19'
    }
  ];

  const generateXLSX = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert bug data to worksheet
    const ws = XLSX.utils.json_to_sheet(sampleBugs);
    
    // Set column widths for better readability
    const colWidths = [
      { wch: 35 }, // title
      { wch: 80 }, // description
      { wch: 10 }, // priority
      { wch: 12 }, // status
      { wch: 15 }, // reportedBy
      { wch: 15 }, // assignedTo
      { wch: 12 }, // issueEnv
      { wch: 40 }, // comments
      { wch: 12 }, // reportedOn
      { wch: 12 }, // createdAt
      { wch: 12 }  // updatedAt
    ];
    ws['!cols'] = colWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Bugs');
    
    // Generate file and trigger download
    XLSX.writeFile(wb, 'sample_bugs_import.xlsx');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Bug Import Sample File Generator
            </h1>
            <p className="text-gray-600">
              Download a sample XLSX file with bug data for testing your import functionality
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h2 className="font-semibold text-blue-900 mb-2">Sample File Contains:</h2>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>10 sample bug entries</li>
              <li>Various priorities: P2, P1, P3, P4</li>
              <li>Different statuses: open, in-progress, resolved</li>
              <li>Multiple environments: Production, Staging, Development</li>
              <li>Complete field data for testing</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">File Structure:</h3>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Column</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">title</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">Login page not loading</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">description</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">Detailed description...</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">priority</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">P2, P1, P3, P4</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">status</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">open, in-progress, resolved</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">reportedBy</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">John Doe</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">assignedTo</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">Jane Smith</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">issueEnv</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">Production, Staging, Development</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">comments</td>
                    <td className="py-2 px-3">String</td>
                    <td className="py-2 px-3">Additional notes</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">reportedOn</td>
                    <td className="py-2 px-3">Date</td>
                    <td className="py-2 px-3">2024-01-15</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3">createdAt</td>
                    <td className="py-2 px-3">Date</td>
                    <td className="py-2 px-3">2024-01-15</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">updatedAt</td>
                    <td className="py-2 px-3">Date</td>
                    <td className="py-2 px-3">2024-01-15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={generateXLSX}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Sample XLSX File
          </button>

          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Usage Tips:</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• You can edit the downloaded file to add your own test data</li>
              <li>• Make sure to keep the column headers exactly as shown</li>
              <li>• The projectId will be automatically added during import</li>
              <li>• Date format should be YYYY-MM-DD</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugImportSampleGenerator;