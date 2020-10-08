import React from 'react';
import Header from './components/Header';
import JobListing from './components/JobListing';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <JobListing />
    </div>
  );
}

export default App;
