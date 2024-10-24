// src/types/index.ts
export type ProjectStatus = 'active' | 'completed' | 'pending' | 'on-hold';
export type DocumentType = 'report' | 'assessment' | 'permit' | 'certificate' | 'correspondence' | 'analysis';
export type EnvironmentalSector = 'air' | 'water' | 'soil' | 'waste' | 'noise' | 'biodiversity';

export interface ClientProfile {
  id: number;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface Project {
  id: number;
  clientId: number;
  name: string;
  description: string;
  sector: EnvironmentalSector;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  budget: number;
}

export interface Document {
  id: number;
  projectId: number;
  name: string;
  type: DocumentType;
  description: string;
  uploadDate: string;
  lastModified: string;
  status: 'draft' | 'under-review' | 'approved' | 'archived';
  version: string;
  fileUrl: string;
  fileSize: string;
  tags: string[];
}

export interface ComplianceRecord {
  id: number;
  projectId: number;
  type: string;
  dueDate: string;
  status: 'compliant' | 'non-compliant' | 'pending-review';
  description: string;
  attachments: Document[];
}