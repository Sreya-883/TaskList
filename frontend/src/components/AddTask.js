import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import {useForm} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {BsPlusCircle} from 'react-icons/bs';
import { useNavigate,Link } from 'react-router-dom';
function AddTask() {
  let navigate=useNavigate();
  let[err,setErr]=useState("");
let {register,handleSubmit,formState:{errors}}=useForm();
let submitForm=(newTask)=>{
  newTask.status='Pending';
  axios.post("http://localhost:3001/api/post",newTask)
  .then(response=>{
    setErr("")
    alert("Task added Succesfully")
    window.location.reload();
  })
  .catch(error=>{
    setErr(error.message)
  })
 }
 let[recent,setRecent]=useState({});
 useEffect(()=>{
  axios.get('http://localhost:3001/api/get').then(res=>{res.data.map(obj=>setRecent(obj))})
 },[]);
  return (
     <div className='text-center  fw-bold ms-3'>
      <h4 className='my-3 text-start'>Add New Task </h4>
       <h6 className='my-3 text-start'>Enter Task Details</h6>
       {err.length!==0&&<p className='text-danger text-center'>{err}</p>}
    <Form className='mt-3' onSubmit={handleSubmit(submitForm)}>
      <Row >
        <Form.Group as={Col} md="3" >
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task"
            {...register("task")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="2" >
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            {...register("startTime")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="2">
          <Form.Label>End Time</Form.Label>
          <InputGroup>
            <Form.Control
              type="time"
              {...register("endTime")}
              required
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="2" >
          <Form.Label>Priority</Form.Label>
          <Form.Select {...register("priority")}>
      <option disabled value="DEFAULT">Choose Category</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </Form.Select>

        </Form.Group>
        <Form.Group as={Col} md="2" >
          <Form.Label>Personal</Form.Label>
          <Form.Select {...register("personal")}>
      <option disabled value="DEFAULT">Choose Status</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </Form.Select>

        </Form.Group>
      <Form.Group as={Col} md="1" >
      <Form.Label>Add Task</Form.Label>
      <br/>
      <button type="submit" className=' .btn border-0 bg-white text-center text-primary fs-4'><BsPlusCircle/></button>
      </Form.Group>
      </Row>
    </Form>
    <br/>
    <button className="btn btn-info text-center" > <Link className='nav-link' to="/TaskList">View Tasks</Link></button>
    <br/>
    <hr/>
    <div className='fs-5 text-start mb-4 '>Recently Added Task
    </div>
      <table className='table table-bordered border border-5 border-white rounded-3'>
            <tbody>{
                <tr className='bg bg-secondary  bg-opacity-50  rounded-3 border-5 border-white'>
                    <td className=' w-25 fw-normal  rounded-3'>{recent.task}</td>
                    <td  className='fw-normal rounded-3 '>{recent.startTime}</td>
                    <td className='fw-normal  rounded-3'>{recent.endTime}</td>
                    <td className='fw-normal  rounded-3'>{recent.priority}</td>
                    <td className='fw-normal  rounded-3'>{recent.personal}</td>
                    <td className='fw-normal  rounded-3'>{recent.status}</td>
                </tr>  
             }
          </tbody>
        </table>
    </div>
  );
}
export default AddTask;