import React from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import TodosContainer from "./components/TodosContainer";
import AppProvider from "./providers/AppProvider";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <TodosContainer />
      </Layout>
      <Toaster position="bottom-center" reverseOrder={false} />
    </AppProvider>
  );
};

export default App;
