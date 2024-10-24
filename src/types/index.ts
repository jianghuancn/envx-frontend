// src/types/index.ts
export interface AIAnalysis {
  summary: string;
  keyPoints: string[];
  sentiment: string;
  riskLevel: string;
  categories: string[];
}

export interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
  content: string;
  tags: string[];
  aiAnalysis: AIAnalysis;
}

export interface Client {
  id: number;
  name: string;
  documents: Document[];
}
