import React from 'react';
import './customInput.css';

const customInput = ({type, name, value, onChange, placeholder}) => {
  return (
    <div className='container'>
      <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder} 
      className="input" 
      />
    </div>
  )
}

export default customInput;