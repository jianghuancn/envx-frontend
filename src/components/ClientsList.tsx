// src/components/ClientsList.tsx
import React from 'react';
import { Search, Plus, Folder } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedClient } from '../store/slices/clientsSlice';

export const ClientsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: clients, selectedClientId } = useAppSelector(state => state.clients);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
              selectedClientId === client.id 
                ? 'bg-blue-50 text-blue-700' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => dispatch(setSelectedClient(client.id))}
          >
            <Folder className={`w-4 h-4 ${selectedClientId === client.id ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="font-medium">{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// src/components/DocumentAnalysis.tsx
import React from 'react';
import { FileSearch, BookOpen, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Card, CardContent } from './ui/card';
import { Document } from '../types';

interface Props {
  document: Document;
}

export const DocumentAnalysis: React.FC<Props> = ({ document }) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState<{ type: string; content: string } | null>(null);

  const generateContent = async (type: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGeneratedContent({ type, content: `Generated ${type} for ${document.name}` });
    setIsProcessing(false);
  };

  return (
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
          {/* ... Tabs content similar to previous implementation ... */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// src/components/DocumentsList.tsx
import React from 'react';
import { Plus, FileText, MoreVertical, Download, Trash, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DocumentAnalysis } from './DocumentAnalysis';
import { useAppSelector } from '../store/hooks';

export const DocumentsList: React.FC = () => {
  const { items: clients, selectedClientId } = useAppSelector(state => state.clients);
  const selectedClient = clients.find(c => c.id === selectedClientId);

  if (!selectedClient) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Select a client to view their documents
      </div>
    );
  }

  return (
    <Card className="border-none shadow-sm">
      {/* ... Card content similar to previous implementation ... */}
    </Card>
  );
};