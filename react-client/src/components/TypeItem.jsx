import React from 'react';

const TypeItem = (props) => (
  <div>
    <li onClick={()=>props.click(props.item)}>{props.item}</li>
  </div>
)

export default TypeItem;
