import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

const TodoCards = ({ title, body }) => {
  return (
    <div className='p-3 todo-cards'>
      <div>
        <h5>{title}</h5>
        <p className='todo-cards-p'>{body.split("", 77)}...</p>
      </div>
      <div>
        <AiFillDelete />
      </div>
    </div>
  );
};

export default TodoCards;
