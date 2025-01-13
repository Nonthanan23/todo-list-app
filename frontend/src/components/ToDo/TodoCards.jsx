import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GrDocumentUpdate } from 'react-icons/gr';


const TodoCards = ({ title, body, id, delid, display }) => {
  return (
    <div className='p-3 todo-cards'>
      <div>
        <h5>{title}</h5>
        <p className='todo-cards-p'>{body.split("", 77)}...</p>
      </div>
      <div className='d-flex justify-content-around'>
        <div className='d-flex justify-content-center align-items-center card-icons-head' onClick={() => {
          display ("block")}}>
          <GrDocumentUpdate className='card-icons'/> Update
        </div>
        <div className='d-flex justify-content-center align-items-center card-icons-head' onClick={() => delid(id)}>
          <AiFillDelete className='card-icons'/> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
