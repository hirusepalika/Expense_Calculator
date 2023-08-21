import '../App.css';
import React, {useState} from 'react';
import CreateNewDashboard from './CreateNewDashboard';
import ExpenseReporterHeader from './ExpenseReporterHeader';
// import RenderModalOptions from './OptionsForCreateNewDB';

function ExpenseReportVisualizer() {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  return (
    <div className="App-header">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400&family=Offside&display=swap');
      </style>
      <ExpenseReporterHeader 
        showNewDashboard={showNewDashboard}
        setShowNewDashboard={setShowNewDashboard}
      />
      {showNewDashboard ? <CreateNewDashboard showNewDashboard={showNewDashboard} setShowNewDashboard={setShowNewDashboard}/> : null}
    </div>
  );
}

export default ExpenseReportVisualizer;
