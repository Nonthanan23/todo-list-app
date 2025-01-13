import React, { useState } from 'react';
import './Todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';

const Todo = () => {
  const [input, setInput] = useState({ title: '', body: '' });
  const [tasks, setTasks] = useState([]);
  const [showTextarea, setShowTextarea] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = () => {
    if (input.title.trim() === '' || input.body.trim() === '') {
      toast.error('Both fields are required!');
      return;
    }
    setTasks([...tasks, { id: Date.now(), ...input }]);
    setInput({ title: '', body: '' });
    toast.success('Task added successfully!');
  };

  const del = (id) => {
    const updatedTasks = tasks.filter((_, index) => index !== id);
    setTasks(updatedTasks);
    toast.info('Task deleted!');
  };

  const dis = (value) => {
    document.getElementById('todo-update').style.display = value;
  };

  return (
    <div className="todo">
      <ToastContainer />
      <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
        <div className="d-flex flex-column todo-input-div w-50 p-3">
          <input
            type="text"
            placeholder="Title"
            className="my-2 p-2 todo-input"
            onClick={() => setShowTextarea(true)}
            name="title"
            value={input.title}
            onChange={change}
          />
          <textarea
            placeholder="Body"
            name="body"
            value={input.body}
            className="p-2 todo-input"
            style={{ display: showTextarea ? 'block' : 'none' }}
            onChange={change}
          />
        </div>
        <div className="w-50 d-flex justify-content-end my-3">
          <button className="home-btn px-5 py-2" onClick={submit}>
            Add
          </button>
        </div>
      </div>
      <div className="todo-body">
        <div className="container-fluid">
          <div className="row">
            {tasks.map((item, index) => (
              <div key={index} className="col-lg-3 col-8 mx-5 my-2">
                <TodoCards title={item.title} body={item.body} id={index} delid={del} display={dis}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update"><Update display={dis} /></div>
      </div>
    </div>
  );
};

export default Todo;
