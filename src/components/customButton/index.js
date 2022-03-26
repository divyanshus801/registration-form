import React from 'react';
import './customButton.css';

const customButton = ({ text, onClick}) => {
  return (
    <div className='customBtn-wrapper'>
    <button className='customBtn' onClick={onClick} >{text}</button>
    </div>
  )
}

export default customButton