
import { ExperimentData, DatasetData, ExportStatus } from "../types/dataExport";

// Mock data - in a real app, this would come from an API
const mockExperiments: ExperimentData[] = [
  {
    id: "exp-001",
    name: "Classification Model V1",
    createdAt: "2024-05-01T12:00:00Z",
    status: "completed",
    metrics: { accuracy: 0.92, f1_score: 0.89 }
  },
  {
    id: "exp-002",
    name: "Regression Analysis",
    createdAt: "2024-05-03T09:30:00Z",
    status: "completed",
    metrics: { mse: 0.03, r2: 0.95 }
  },
  {
    id: "exp-003",
    name: "Clustering Test",
    createdAt: "2024-05-05T14:20:00Z",
    status: "running"
  },
  {
    id: "exp-004",
    name: "NLP Pipeline",
    createdAt: "2024-05-02T10:15:00Z",
    status: "completed",
    metrics: { bleu: 0.78, rouge: 0.81 }
  },
  {
    id: "exp-005",
    name: "Image Classification",
    createdAt: "2024-04-28T16:45:00Z",
    status: "failed"
  }
];

const mockDatasets: DatasetData[] = [
  {
    id: "ds-001",
    name: "Customer Feedback",
    recordCount: 5000,
    createdAt: "2024-04-20T08:00:00Z",
    format: "csv"
  },
  {
    id: "ds-002",
    name: "Sales Transactions",
    recordCount: 12500,
    createdAt: "2024-04-25T13:30:00Z",
    format: "csv"
  },
  {
    id: "ds-003",
    name: "User Interactions",
    recordCount: 8700,
    createdAt: "2024-04-30T09:15:00Z",
    format: "json"
  }
];

// Helper to simulate delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to convert objects to CSV strings
const objectToCSV = (obj: Record<string, any>): string => {
  const headers = Object.keys(obj).join(',');
  const values = Object.values(obj).map(value => {
    if (typeof value === 'object' && value !== null) {
      return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
    }
    return typeof value === 'string' ? `"${value}"` : value;
  }).join(',');
  
  return `${headers}\n${values}`;
};

// Main export service
export const exportService = {
  // Get list of experiments
  async getExperiments(projectId: string): Promise<ExperimentData[]> {
    await delay(800);
    return mockExperiments;
  },
  
  // Get list of datasets
  async getDatasets(projectId: string): Promise<DatasetData[]> {
    await delay(600);
    return mockDatasets;
  },
  
  // Export experiment data to CSV
  async exportExperimentToCSV(experiment: ExperimentData): Promise<string> {
    await delay(1000 + Math.random() * 1000); // Random delay to simulate different processing times
    
    // In a real application, this would get the full experiment data and format it
    // For our demo, we'll just use what we have
    return objectToCSV({
      id: experiment.id,
      name: experiment.name,
      createdAt: experiment.createdAt,
      status: experiment.status,
      metrics: experiment.metrics || {}
    });
  },
  
  // Export dataset to CSV
  async exportDatasetToCSV(dataset: DatasetData): Promise<string> {
    await delay(1000 + Math.random() * 2000); // Random delay to simulate different processing times
    
    // In a real application, this would get the actual dataset content
    // For our demo, we'll create mock data
    let csvContent = "id,value,category,timestamp\n";
    const categories = ["A", "B", "C"];
    
    for (let i = 0; i < Math.min(dataset.recordCount, 10); i++) {
      const row = [
        `record-${i+1}`,
        (Math.random() * 100).toFixed(2),
        categories[Math.floor(Math.random() * categories.length)],
        new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
      ].join(',');
      
      csvContent += row + '\n';
    }
    
    return csvContent;
  },
  
  // Save content as a file (in a browser context)
  saveAsFile(content: string, filename: string): void {
    // In a browser context, this would create a download
    // For our simulation, we'll just log it
    console.log(`Saving file: ${filename}`);
    console.log(`Content preview: ${content.slice(0, 100)}...`);
    
    // In a real app with browser API access:
    // const blob = new Blob([content], { type: 'text/csv' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = filename;
    // a.click();
    // URL.revokeObjectURL(url);
  }
};
