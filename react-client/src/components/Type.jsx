import React from 'react';
import TypeItem from './TypeItem.jsx';

const Type = (props) => (
  <div>

    { props.types.map((item,index) => <TypeItem key={index} item={item} click ={props.click}/>)}
  </div>
)

export default Type;
