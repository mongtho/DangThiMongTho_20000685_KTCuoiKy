import React from 'react';
import { AppProvider as AppProvider1 } from './src_cau1/AppContext';
import YourComponent from './src_cau1/components/YourComponent';
import { AppProvider as AppProvider2 } from './src_cau2/AppContext';
import YourCo from './src_cau2/components/YourComponent';
import { AppProvider as AppProvider3 } from './src_cau3/AppContext';
import TodoList from './src_cau3/TodoList'; 

const App = () => {
  return (
    <>
      <AppProvider1>
        <YourComponent />
      </AppProvider1>
      <AppProvider2>
        <YourCo />
      </AppProvider2>
      <AppProvider3>
        <TodoList />
      </AppProvider3>
    </>
  );
};

export default App;
