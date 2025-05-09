
import React from "react";
import { ExportStatus } from "@/types/dataExport";
import { CheckCircle, XCircle, FileText, Database } from "lucide-react";

interface ExportFileListProps {
  status: ExportStatus;
}

const ExportFileList: React.FC<ExportFileListProps> = ({ status }) => {
  // Don't show if no files have been exported or attempted
  if (status.exportedFiles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Exported Files</h2>
      
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Path
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {status.exportedFiles.map((file, index) => (
              <tr key={index} className={file.status === 'error' ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {file.type === 'experiment' ? (
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    ) : (
                      <Database className="h-5 w-5 text-green-500 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {file.type === 'experiment' ? 'Experiment' : 'Dataset'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {file.status === 'success' ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-sm text-green-800">Success</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-1" />
                        <span className="text-sm text-red-800">Failed</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {file.status === 'success' ? file.path : file.error}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExportFileList;
