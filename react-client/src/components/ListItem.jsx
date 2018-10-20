import React from 'react';

const ListItem = (props) => (
  <div>
  <p> {props.item.img.split('breeds/')[1].slice(0,props.item.img.split('breeds/')[1].indexOf('/'))}</p>
    <img src = {props.item.img} onClick={()=>props.click(props.item)}/>
  </div>
)

export default ListItem;
