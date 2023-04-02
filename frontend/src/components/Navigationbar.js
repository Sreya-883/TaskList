import React from 'react'
import { Link } from 'react-router-dom'

function Navigationbar() {
  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
  }
  
  console.log(getPreviousDay()); // yesterday
  
  // ️ Fri Dec 23 2022
  console.log(getPreviousDay(new Date('2022-12-24')));
  
  //  Sat Dec 31 2022
  console.log(getPreviousDay(new Date('2023-01-01')));
  return (
    <div className=' bg-light mt-1 fw-bold'>
      
      <nav className="navbar navbar-expand-md navbar-light ">
      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse  flex-column" id="navbarNav">
    <ul className="navbar-nav flex-column mt-2  w-100">
      <input placeholder='search tasks' type='text'>
      </input>
    <div className=' fs-4 text-start mt-4 '>Today</div>
    <hr/>
      <li className="nav-item text-start">
        <Link className="nav-link text-success" to="/taskList">All Tasks</Link>
      </li>
      <hr/>
      <li className="nav-item text-start">
        <Link className="text-dark fs-5 nav-link" to="/">Add Task</Link>
      </li>
      <li className="nav-item text-start">
        <Link className="text-danger nav-link" to="/high">High</Link>
      </li>
      <li className="nav-item text-start">
        <Link className="text-warning nav-link" to="/medium">Medium</Link>
      </li>
      <li className="nav-item text-start">
        <Link className="text-dark text-opacity-75 nav-link" to="/low">Low</Link>
      </li>
      <hr />
      <li className="nav-item text-start">
        <Link className="text-primary nav-link" to="/personal">Personal</Link>
      </li>
      <hr />
    </ul>
  </div>
</nav>  
 </div>
  )
}

export default Navigationbar