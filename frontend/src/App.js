import './App.css';
import React from 'react';
import AddTask from './components/AddTask';
import TaskListHigh from './components/TaskListHigh';
import TaskListMedium from './components/TaskListMedium';
import TaskListLow from './components/TaskListLow';
import TaskListPersonal from './components/TaskListPersonal';
import RootLayout from './components/RootLayout';
import TaskList from './components/TaskList';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<AddTask/>
        },
        {
          path:'/tasklist',
          element:<TaskList />
        },
        {
          path:'/high',
          element:<TaskListHigh />
        },{
          path:'/medium',
          element:<TaskListMedium />
        },{
          path:'/low',
          element:<TaskListLow />
        },
        {
          path:'/personal',
          element:<TaskListPersonal />
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;