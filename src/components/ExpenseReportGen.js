import '../App.css';
import React, {useState} from 'react';
import CreateNewDashboardOptions from './CreateNewDashboardOptions';
import CreateNewDashboardFromScratch from './CreateNewDashboardFromScratch';
import ExpenseReporterHeader from './ExpenseReporterHeader';
// import RenderModalOptions from './OptionsForCreateNewDB';
// import { Router, Route, Routes } from 'react-router';
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom"


function AppRoutes() {
  const routes = useRoutes(
    [
      {path:'/CreateNewDashboardOptions',element:<CreateNewDashboardOptions/>},
      {path:'/UploadNewDashboard',element:<CreateNewDashboardOptions/>},
      {path:'/CreateNewDashboard',element:<CreateNewDashboardFromScratch/>},
    ]
  )
  return routes;
}

function ExpenseReportVisualizer() {
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  // return (
  //   // <div className="App-header">
  //     {/* <style>
  //       @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400&family=Offside&display=swap');
  //     </style> */}
  //     {/* {showNewDashboard ? <CreateNewDashboard showNewDashboard={showNewDashboard} setShowNewDashboard={setShowNewDashboard}/> : null} */} */}

  //     {/* <ExpenseReporterHeader 
  //       showNewDashboard={showNewDashboard}
  //       setShowNewDashboard={setShowNewDashboard}
  //     /> */}
  //     <>
  //       <Routes>
  //         <Route path="/CreateNewDashboard" component={<CreateNewDashboard />} />
  //       </Routes>
  //     </>
      
  //   // </div>
  // );

  return (
      <>
        <Router>
          <div className="App-header">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400&family=Offside&display=swap');
            </style>
            <ExpenseReporterHeader/>
            <AppRoutes />
          </div>
        </Router>
      </> 
  );
}

export default ExpenseReportVisualizer;
