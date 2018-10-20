import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
  {console.log(props.items.length)}
    <h4> List Component </h4>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem item={item} click={props.click}/>)}
  </div>
)

export default List;
