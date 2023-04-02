import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import {Modal,Button} from 'react-bootstrap'
import {TiDeleteOutline} from 'react-icons/ti'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function TaskList() {
  let [TodoTask,setTask]=useState([]);
  let [show,setShow]=useState(false);
  let [error, setError] = useState("");
   useEffect(() => getTasks(), [TodoTask.length]);
  let [taskToEdit, setTaskToEdit] = useState({});
  let {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
  axios.get('http://localhost:3001/api/get')
  .then(response=>{
      console.log(response.data);
      setTask(response.data);
  })
  .catch(err=>console.log(err));
  },[])
  const removeTodo=((id)=>{
    axios.delete(`http://localhost:3001/api/delete/${id}`)
    .then(res=>getTasks())
    .catch(err=>console.log(err)); 
  })
  const getTasks = () => {
    axios
      .get("http://localhost:3001/api/get")
      .then((res) => {
        if (res.status === 200) {
          setTask(res.data);
          //clear error message
          setError("");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };
  const editTodo=(taskToEdit)=>{
    handleShow();
    setTaskToEdit(taskToEdit);
    setValue("task", taskToEdit.task);
    setValue("startTime", taskToEdit.startTime);
    setValue("endTime", taskToEdit.endTime);
    setValue("category", taskToEdit.category);
    setValue("status", taskToEdit.status);
  };
  const saveTask= () => {
    handleClose();
    let modifiedTask = getValues();
    modifiedTask.id = taskToEdit.id;
    //modify user in DB
    axios
      .put(`http://localhost:3001/api/update/${modifiedTask.id}`,modifiedTask)
      .then((res) => {
        if (res.status === 200) {
          //get recent users
          getTasks();
          //clear error message
          setError("");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };
  let clearAll=()=>{
    {
      TodoTask.map(taskObj=>removeTodo(taskObj.id))
    }
    getTasks();
  }
  let reload=(obj)=>{
    if(obj.status=='Pending') obj.status='Completed';
    else obj.status='Pending';
    axios
    .put(`http://localhost:3001/api/update/${obj.id}`,obj)
    .then((res) => {
      if (res.status === 200) {
        setError("");
      } else {
        throw new Error("Something went wrong");
      }
      window.location.reload();
    })
  }
  return (
    <div className='mb-3 mt-3 text-center'>
      <div className='fs-2 mb-1 fw-light '>List of Tasks</div>
      {TodoTask.length!=0 ?
      <div>
      <div className='fs-4  text-start mt-3'>Pending Tasks</div>
      <table className='table table-bordered border border-5 border-white rounded-3'>
            <thead className='bg bg-info '>
                <tr>
                    <th width='5%'className='rounded-3 p-3'></th>
                    <th className='w-25 rounded-3 p-3'>Task</th>
                    <th width='15%' className='rounded-3 p-3'>Start Time</th>
                    <th width='15%' className='rounded-3 p-3'>End Time</th>
                    <th width='18%'className='rounded-3 p-3'>priority</th>
                    <th width='18%'className='rounded-3 p-3'>personal</th>
                    <th width='15%'className='rounded-3 p-3'>Edit</th>
                    <th width='15%'className='rounded-3 p-3'>Delete</th>
                </tr>
            </thead>
            <tbody >
              { 
              TodoTask.map(todoTaskObj=>todoTaskObj.status=='Pending'&&
                <tr className='bg bg-secondary  bg-opacity-25  rounded-3 border-5 border-white'>
                  <td width='5%'className='rounded-3 p-3'><input onClick={()=>reload(todoTaskObj)} type='checkbox'/></td>
                    <td className=' w-25 fw-normal  rounded-3'>{todoTaskObj.task}</td>
                    <td  className='fw-normal rounded-3 '>{todoTaskObj.startTime}</td>
                    <td className='fw-normal  rounded-3'>{todoTaskObj.endTime}</td>
                    <td className='fw-normal  rounded-3'>{todoTaskObj.priority}</td>
                    <td className='fw-normal  rounded-3'>{todoTaskObj.personal}</td>
                    <td  className=' rounded-3'> <button className='btn btn-primary  ' onClick={()=>editTodo(todoTaskObj)}><FiEdit/>
                    </button></td>
                    <td  className=' rounded-3'><button className='btn btn-warning ' onClick={()=>removeTodo(todoTaskObj.id)}><TiDeleteOutline/>
                    </button></td>
                </tr>  
              )
              }
          </tbody>
        </table>
        <div className='fs-4  text-start mt-5'>Completed Tasks</div>
        <table className='table table-bordered border border-5 border-white rounded-3'>
            <thead className='bg bg-info '>
                <tr>
                    <th width='5%'className='rounded-3 p-3'></th>
                    <th className='w-25 rounded-3 p-3'>Task</th>
                    <th width='15%' className='rounded-3 p-3'>Start Time</th>
                    <th width='15%' className='rounded-3 p-3'>End Time</th>
                    <th width='18%'className='rounded-3 p-3'>priority</th>
                    <th width='18%'className='rounded-3 p-3'>personal</th>
                    <th width='15%'className='rounded-3 p-3'>Edit</th>
                    <th width='15%'className='rounded-3 p-3'>Delete</th>
                </tr>
            </thead>
            <tbody >
             {
              TodoTask.map(todoTaskObj=>todoTaskObj.status=='Completed'&&
                <tr className='bg bg-secondary  bg-opacity-25  rounded-3 border-5 border-white'>
                  <td width='5%'className='rounded-3 p-3'><input onClick={()=>reload(todoTaskObj)} type='checkbox' checked/></td>
                    <td className=' w-25 fw-normal  rounded-3'>{todoTaskObj.task}</td>
                    <td  className='fw-normal rounded-3 '>{todoTaskObj.startTime}</td>
                    <td className='fw-normal  rounded-3'>{todoTaskObj.endTime}</td>
                    <td className='fw-normal  rounded-3'>{todoTaskObj.priority}</td>
                    <td className='fw-normal  rounded-3'>{todoTaskObj.personal}</td>
                    <td  className=' rounded-3'> <button className='btn btn-primary  ' onClick={()=>editTodo(todoTaskObj)}><FiEdit/>
                    </button></td>
                    <td  className=' rounded-3'><button className='btn btn-warning ' onClick={()=>removeTodo(todoTaskObj.id)}><TiDeleteOutline/>
                    </button></td>
                </tr>  
              )
             }
          </tbody>
        </table>
        
        
        
        
        
        
        </div>:<p className='fs-1 fw-light text-success m-5'>Task List is Empty</p>
        }
        
         <div className='d-flex justify-content-around mt-4'>
        <Button className="btn btn-success float-start me-5 " > <Link className='nav-link' to="/">Add Task</Link></Button>
        {TodoTask.length!=0&&<Button className="btn btn-danger  " onClick={clearAll}>Clear All</Button>}
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form className='' onSubmit={handleSubmit(saveTask)}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" >
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task"
            {...register("task")}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" >
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            {...register("startTime")}
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>End Time</Form.Label>
          <InputGroup>
            <Form.Control
              type="time"
              {...register("endTime")}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" >
          <Form.Label>Category</Form.Label>
          <Form.Select {...register("category")}>
      <option disabled value="DEFAULT">Choose Category</option>
      <option value="Personal">Personal</option>
      <option value="Professional">Professional</option>
      <option value="Other">Other</option>
    </Form.Select>

        </Form.Group>
        <Form.Group as={Col} md="6" >
          <Form.Label>Status</Form.Label>
          <Form.Select {...register("status")}>
      <option disabled value="DEFAULT">Choose Status</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </Form.Select>
    </Form.Group>
    </Row>
    </Form>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default TaskList