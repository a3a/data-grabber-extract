
export interface ProjectData {
  id: string;
  name: string;
}

export interface ExperimentData {
  id: string;
  name: string;
  createdAt: string;
  status: 'completed' | 'running' | 'failed';
  metrics?: Record<string, number>;
}

export interface DatasetData {
  id: string;
  name: string;
  recordCount: number;
  createdAt: string;
  format: string;
}

export interface ExportStatus {
  inProgress: boolean;
  completed: boolean;
  error: string | null;
  successCount: number;
  failCount: number;
  totalCount: number;
  exportedFiles: Array<{
    name: string;
    type: 'experiment' | 'dataset';
    status: 'success' | 'error';
    path?: string;
    error?: string;
  }>;
}
