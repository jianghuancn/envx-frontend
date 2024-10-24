// src/components/layout/Sidebar.tsx
import React from 'react';
import { FolderOpen, Users, FileText, Bell, Settings, BarChart2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">EnvX Manager</h1>
      </div>
      
      <nav className="space-y-1">
        <SidebarItem icon={<Users />} label="Clients" active />
        <SidebarItem icon={<FolderOpen />} label="Projects" />
        <SidebarItem icon={<FileText />} label="Documents" />
        <SidebarItem icon={<BarChart2 />} label="Reports" />
        <SidebarItem icon={<Bell />} label="Notifications" />
        <SidebarItem icon={<Settings />} label="Settings" />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <div 
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-150 ${
      active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <span className={active ? 'text-blue-500' : 'text-gray-500'}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;