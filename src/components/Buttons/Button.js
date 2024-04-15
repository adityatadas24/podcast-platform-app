import React from 'react'
import './style.css'
const Button = ({text,handleSubmit,disabled,style}) => {
  return (
    <div>
      <button style={style} className='signup-btn' disabled={disabled} onClick={handleSubmit}>{text}</button>
    </div>
  )
}

export default Button
