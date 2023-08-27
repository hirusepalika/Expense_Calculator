import '../App.css';
import React, {useEffect} from 'react';
import CreateNewDashboardOptions from './CreateNewDashboardOptions';
import CreateNewDashboardFromScratch from './CreateNewDashboardFromScratch';
import ExpenseReporterHeader from './ExpenseReporterHeader';
import UploadNewDashboard from './UploadNewDashboard';
import { BrowserRouter as Router, useRoutes } from "react-router-dom"


function AppRoutes() {
  const routes = useRoutes(
    [
      {path:'/CreateNewDashboardOptions',element:<CreateNewDashboardOptions/>},
      {path:'/UploadNewDashboard',element:<UploadNewDashboard/>},
      {path:'/CreateNewDashboard',element:<CreateNewDashboardFromScratch/>},
    ]
  )
  return routes;
}


function ExpenseReportVisualizer() {
  // TODO use when I need to change background image class = "App-header-Background-Image" instead of "App-header"
  const currentPath = window.location.origin + window.location.pathname;

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
