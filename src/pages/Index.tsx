
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ExportHeader from "@/components/ExportHeader";
import ExportProgress from "@/components/ExportProgress";
import ExportFileList from "@/components/ExportFileList";
import { exportService } from "@/services/exportService";
import { ExportStatus, ExperimentData, DatasetData } from "@/types/dataExport";

const Index = () => {
  const [projectId, setProjectId] = useState<string>("");
  const [directory, setDirectory] = useState<string>("/exports");
  const [exportStatus, setExportStatus] = useState<ExportStatus>({
    inProgress: false,
    completed: false,
    error: null,
    successCount: 0,
    failCount: 0,
    totalCount: 0,
    exportedFiles: []
  });

  const handleProjectChange = (id: string) => {
    setProjectId(id);
    // Reset status when project changes
    setExportStatus({
      inProgress: false,
      completed: false,
      error: null,
      successCount: 0,
      failCount: 0,
      totalCount: 0,
      exportedFiles: []
    });
  };

  const handleDirectoryChange = (dir: string) => {
    setDirectory(dir);
  };

  const handleExport = async () => {
    if (!projectId) {
      toast.error("Please select a project first");
      return;
    }

    if (!directory) {
      toast.error("Please specify an export directory");
      return;
    }

    try {
      // Start export process
      setExportStatus({
        inProgress: true,
        completed: false,
        error: null,
        successCount: 0,
        failCount: 0,
        totalCount: 0,
        exportedFiles: []
      });

      toast.info("Starting data export...");

      // Fetch experiments and datasets
      const [experiments, datasets] = await Promise.all([
        exportService.getExperiments(projectId),
        exportService.getDatasets(projectId)
      ]);

      const totalItems = experiments.length + datasets.length;
      
      setExportStatus(prev => ({
        ...prev,
        totalCount: totalItems
      }));

      // Process experiments
      for (const experiment of experiments) {
        try {
          const csvContent = await exportService.exportExperimentToCSV(experiment);
          const filename = `${directory}/experiment_${experiment.id}.csv`;
          exportService.saveAsFile(csvContent, filename);
          
          // Update status
          setExportStatus(prev => ({
            ...prev,
            successCount: prev.successCount + 1,
            exportedFiles: [
              ...prev.exportedFiles,
              {
                name: experiment.name,
                type: 'experiment',
                status: 'success',
                path: filename
              }
            ]
          }));
          
          toast.success(`Exported experiment: ${experiment.name}`);
        } catch (error) {
          console.error(`Error exporting experiment ${experiment.id}:`, error);
          
          // Update status with failure
          setExportStatus(prev => ({
            ...prev,
            failCount: prev.failCount + 1,
            exportedFiles: [
              ...prev.exportedFiles,
              {
                name: experiment.name,
                type: 'experiment',
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error'
              }
            ]
          }));
          
          toast.error(`Failed to export experiment: ${experiment.name}`);
        }
      }

      // Process datasets
      for (const dataset of datasets) {
        try {
          const csvContent = await exportService.exportDatasetToCSV(dataset);
          const filename = `${directory}/dataset_${dataset.id}.csv`;
          exportService.saveAsFile(csvContent, filename);
          
          // Update status
          setExportStatus(prev => ({
            ...prev,
            successCount: prev.successCount + 1,
            exportedFiles: [
              ...prev.exportedFiles,
              {
                name: dataset.name,
                type: 'dataset',
                status: 'success',
                path: filename
              }
            ]
          }));
          
          toast.success(`Exported dataset: ${dataset.name}`);
        } catch (error) {
          console.error(`Error exporting dataset ${dataset.id}:`, error);
          
          // Update status with failure
          setExportStatus(prev => ({
            ...prev,
            failCount: prev.failCount + 1,
            exportedFiles: [
              ...prev.exportedFiles,
              {
                name: dataset.name,
                type: 'dataset',
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error'
              }
            ]
          }));
          
          toast.error(`Failed to export dataset: ${dataset.name}`);
        }
      }

      // Complete the export process
      setExportStatus(prev => ({
        ...prev,
        inProgress: false,
        completed: true
      }));
      
      toast.success(`Export completed: ${experiments.length + datasets.length} files processed`);
      
    } catch (error) {
      console.error("Export process failed:", error);
      
      setExportStatus(prev => ({
        ...prev,
        inProgress: false,
        completed: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
      
      toast.error("Export process failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <ExportHeader
          projectId={projectId}
          onProjectChange={handleProjectChange}
          onDirectoryChange={handleDirectoryChange}
          onExportClick={handleExport}
          isExporting={exportStatus.inProgress}
        />
        
        <ExportProgress status={exportStatus} />
        
        <ExportFileList status={exportStatus} />
      </div>
    </div>
  );
};

export default Index;
