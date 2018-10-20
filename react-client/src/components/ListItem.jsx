import React from 'react';

const ListItem = (props) => (
  <div>
  <p id="namePic"> {props.item.img.split('breeds/')[1].slice(0,props.item.img.split('breeds/')[1].indexOf('/'))}</p>
    <img src = {props.item.img} onMouseLeave={(e) => props.off(e)} onMouseOver={(e) => props.hover(e)} height="300" width="300" onClick={()=>props.click(props.item)}/>
  </div>
)

export default ListItem;
