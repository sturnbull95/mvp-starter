import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    { props.items.map((item,index) => <ListItem key={index} item={item} off={props.off} hover={props.hover} click={props.click}/>)}
  </div>
)

export default List;
