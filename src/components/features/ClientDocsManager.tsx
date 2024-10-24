// src/components/features/ClientDocsManager.tsx
"use client"

import React, { useState } from 'react';
import { 
  Search, Plus, Folder, FileText, MoreVertical, Download, Trash, Brain, 
  FileSearch, BookOpen, Sparkles 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Client, Document } from '@/types';

const ClientDocsManager = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Acme Corp',
      documents: [
        { 
          id: 1, 
          name: 'Contract 2024', 
          type: 'PDF', 
          date: '2024-10-15', 
          size: '2.5 MB',
          content: 'This contract outlines the terms of service for cloud computing infrastructure.',
          tags: ['contract', 'legal', 'cloud'],
          aiAnalysis: {
            summary: 'Service agreement for cloud infrastructure with focus on uptime guarantees.',
            keyPoints: ['Annual renewal terms', 'SLA guarantees', 'Security requirements'],
            sentiment: 'neutral',
            riskLevel: 'medium',
            categories: ['Legal', 'Technical']
          }
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{ type: string; content: string } | null>(null);

  const generateContent = async (type: string, document: Document) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const content = `Generated ${type} for ${document.name}`;
    setGeneratedContent({ type, content });
    setIsProcessing(false);
  };

  const DocumentAnalysisDialog = ({ document }: { document: Document }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200">
          <FileSearch className="w-4 h-4" />
          <span>Analyze</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Document Analysis: {document.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="summary" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Executive Summary</h4>
                  <p className="text-gray-700 leading-relaxed">{document.aiAnalysis.summary}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Sentiment</h4>
                    <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
                      {document.aiAnalysis.sentiment}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Risk Level</h4>
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-medium">
                      {document.aiAnalysis.riskLevel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex space-x-3">
                    <button
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                      onClick={() => generateContent('summary', document)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Generate Summary</span>
                    </button>
                  </div>
                  
                  {isProcessing ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
                      <p className="text-gray-600">Generating content...</p>
                    </div>
                  ) : generatedContent && (
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <h4 className="text-lg font-semibold mb-3">Generated {generatedContent.type}</h4>
                      <p className="text-gray-700 leading-relaxed">{generatedContent.content}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 bg-white p-6 border-r border-gray-200 shadow-sm">
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>

        <div className="space-y-1">
          {filteredClients.map(client => (
            <div
              key={client.id}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedClient?.id === client.id 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => setSelectedClient(client)}
            >
              <Folder className={`w-4 h-4 ${selectedClient?.id === client.id ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="font-medium">{client.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8">
        {selectedClient ? (
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-900">{selectedClient.name}</CardTitle>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm">
                  <Brain className="w-4 h-4" />
                  <span>AI Analysis</span>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                  <Plus className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedClient.documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <DocumentAnalysisDialog document={doc} />
                            <DropdownMenu>
                              <DropdownMenuTrigger className="focus:outline-none">
                                <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700">
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Select a client to view their documents
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDocsManager;
