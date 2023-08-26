import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ExpenseReportVisualizer from './components/ExpenseReportGen';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExpenseReportVisualizer />
  </React.StrictMode>
);

reportWebVitals();
