// src/App.tsx
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainLayout>
        {/* Content will go here */}
      </MainLayout>
    </Provider>
  );
};

export default App;