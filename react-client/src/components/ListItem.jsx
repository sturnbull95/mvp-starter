import React from 'react';

const ListItem = (props) => (
  <div>
    { <img src = {props.item} onClick={()=>props.click(props.item)}/> }
  </div>
)

export default ListItem;
