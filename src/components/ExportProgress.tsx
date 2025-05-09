
import React from "react";
import { ExportStatus } from "@/types/dataExport";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

interface ExportProgressProps {
  status: ExportStatus;
}

const ExportProgress: React.FC<ExportProgressProps> = ({ status }) => {
  // Calculate progress percentage
  const progressPercentage = 
    status.totalCount > 0
      ? Math.round(((status.successCount + status.failCount) / status.totalCount) * 100)
      : 0;

  // Don't show if not in progress and no files have been exported
  if (!status.inProgress && status.exportedFiles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Export Progress</h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {status.inProgress ? "Exporting..." : status.completed ? "Export Complete" : "Export Failed"}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {progressPercentage}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-export-accent bg-opacity-50 rounded p-3">
          <span className="block text-xl font-semibold text-export-primary">
            {status.successCount}
          </span>
          <span className="text-sm text-gray-600">Successfully Exported</span>
        </div>
        <div className="bg-red-50 rounded p-3">
          <span className="block text-xl font-semibold text-red-500">
            {status.failCount}
          </span>
          <span className="text-sm text-gray-600">Failed Exports</span>
        </div>
      </div>

      {status.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {status.error}
        </div>
      )}
    </div>
  );
};

export default ExportProgress;
