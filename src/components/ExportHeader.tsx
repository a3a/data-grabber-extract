
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, FileSpreadsheet } from "lucide-react";

interface ExportHeaderProps {
  projectId: string;
  onProjectChange: (id: string) => void;
  onDirectoryChange: (dir: string) => void;
  onExportClick: () => void;
  isExporting: boolean;
}

const ExportHeader: React.FC<ExportHeaderProps> = ({
  projectId,
  onProjectChange,
  onDirectoryChange,
  onExportClick,
  isExporting,
}) => {
  // Mock project list
  const projects = [
    { id: "proj-001", name: "Sales Analytics" },
    { id: "proj-002", name: "Customer Insights" },
    { id: "proj-003", name: "Marketing Campaign" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <FileSpreadsheet className="h-8 w-8 text-export-primary mr-3" />
        <h1 className="text-2xl font-semibold text-gray-800">Project Data Export</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
            Select Project
          </label>
          <select
            id="project"
            value={projectId}
            onChange={(e) => onProjectChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-export-primary focus:outline-none focus:ring-1 focus:ring-export-primary"
          >
            <option value="">-- Select a project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="directory" className="block text-sm font-medium text-gray-700 mb-1">
            Export Directory
          </label>
          <input
            type="text"
            id="directory"
            placeholder="/exports"
            onChange={(e) => onDirectoryChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-export-primary focus:outline-none focus:ring-1 focus:ring-export-primary"
          />
          <p className="text-xs text-gray-500 mt-1">
            Directory where CSV files will be saved
          </p>
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <Button 
            onClick={onExportClick} 
            disabled={isExporting || !projectId}
            className="bg-export-primary hover:bg-blue-600 text-white"
          >
            {isExporting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Export All as CSV
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportHeader;
