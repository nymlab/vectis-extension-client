import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import TodosContainer from './components/TodosContainer';
import AppProvider from './providers/AppProvider';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <AppProvider>
          <Layout>
            <TodosContainer />
          </Layout>
        </AppProvider>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;
