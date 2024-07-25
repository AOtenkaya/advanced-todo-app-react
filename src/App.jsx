import React from 'react';

import Header from './components/Header';
import SectionList from './components/SectionList';

const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />

      <SectionList />
    </div>
  );
};

export default App;
