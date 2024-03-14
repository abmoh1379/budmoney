import React from 'react'

const Button = (props) => {
    const customClassName = props.className ? props.className : '';
  return (
    <button {...props} className={`button ${(customClassName) ? ' '+ customClassName : ''}`}>{props.children}</button>
  )
}

export default Button